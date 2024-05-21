package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func CorsHeader(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
}

func test(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"message": "HELLO BACK!",
	})

}

func removeOldFiles(dir string, maxAge time.Duration) {
	for {
		files, err := ioutil.ReadDir(dir)
		if err != nil {
			fmt.Println("Error reading directory:", err)
			time.Sleep(15000)
			continue
		}

		now := time.Now()
		for _, file := range files {
			filePath := filepath.Join(dir, file.Name())
			if !file.IsDir() {
				fileInfo, err := os.Stat(filePath)
				if err != nil {
					fmt.Println("Error stating file:", err)
					continue
				}
				if !file.IsDir() && strings.Contains(file.Name(), "chunk") {

					if now.Sub(fileInfo.ModTime()) > maxAge {
						err := os.Remove(filePath)
						if err != nil {
							fmt.Println("Error removing file:", err)
						} else {
							fmt.Printf("Deleted old file: %s\n", filePath)
						}
					}

				}
			}

			time.Sleep(15000)
		}
	}
}

func main() {
	fmt.Println("#### DASHER Server Running ####")

	exec.Command("mkdir", "stream1").Run()
	// Command to run the Docker container
	runDasher := exec.Command(
		"ffmpeg",
		"-i", "udp://235.235.235.235:1111",
		"-an",
		"-f", "dash",
		"-seg_duration", "1",
		"stream1/stream.mpd",
	)

	go removeOldFiles("stream1", time.Second*70)

	// // Set output to current process's standard output
	// runDasher.Stdout = os.Stdout
	// runDasher.Stderr = os.Stderr

	// Execute the run command
	go runDasher.Run()

	r := gin.Default()

	r.Use(CorsHeader)

	r.GET("/hello", test)

	fileDir := "./"

	r.GET("/files/*filepath", func(c *gin.Context) {
		filepath := c.Param("filepath")
		c.File(fileDir + filepath)
	})

	r.Run(":4000")
}
