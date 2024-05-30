package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func CorsHeader(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
}

var DB *gorm.DB

func ConnectToDB() {

	var err error

	dsn := os.Getenv("DB_URL")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	for err != nil {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		time.Sleep(time.Second * 2)
	}

	fmt.Println("Connection Succesful to DB.")

}

func LoadEnvVariables() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}
}

func init() {
	LoadEnvVariables()
	ConnectToDB()
}

func removeOldFiles(dir string, maxAge time.Duration) {
	for {
		files, err := ioutil.ReadDir(dir)
		if err != nil {
			fmt.Println("Error reading directory:", err)
			time.Sleep(time.Second * 3)
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
			time.Sleep(time.Second * 3)
		}

	}
}

//	type Process struct {
//		streamID int
//		Ctx      ctx.Context
//		runDasher     ?
//	}
type Source struct {
	gorm.Model
	Id               string
	Name             string
	MultiCastAddress string
	Port             string
}

func startDasherSources() {

	var sources []Source
	result := DB.Find(&sources)

	if result.Error != nil {
		fmt.Println("Error recieving sources.")
		return
	}

	for index, source := range sources {

		exec.Command("mkdir", "stream"+string(source.Id)).Run()
		// Command to run the Docker container
		fmt.Print(" Started source: ", source.MultiCastAddress+":"+source.Port+" index: "+string(index))
		input := "udp://" + source.MultiCastAddress + ":" + source.Port
		runDasher := exec.Command(
			"ffmpeg",
			"-stream_loop", "-1",
			"-re",
			"-i", input,
			"-map", "0:v", // Only map video streams
			"-c:v", "libx264",
			"-b:v:0", "800k",
			"-profile:v:0", "main",
			"-b:v:1", "300k",
			"-s:v:1", "320x170",
			"-profile:v:1", "baseline",
			"-bf", "1",
			"-keyint_min", "120",
			"-g", "120",
			"-sc_threshold", "0",
			"-b_strategy", "0",
			"-use_timeline", "1",
			"-use_template", "1",
			"-window_size", "3",
			"-adaptation_sets", "id=0,streams=v",
			"-f", "dash",
			"stream"+string(source.Id)+"/stream.mpd",
		)

		go removeOldFiles("stream"+string(source.Id), time.Second*15)

		// // Set output to current process's standard output
		// runDasher.Stdout = os.Stdout
		// runDasher.Stderr = os.Stderr

		// Execute the run command
		go runDasher.Run()
	}

}

func main() {
	fmt.Println("#### DASHER Server Running ####")

	r := gin.Default()

	r.Use(CorsHeader)

	time.Sleep(time.Second * 5)

	go startDasherSources()

	fileDir := "./"

	r.GET("/files/*filepath", func(c *gin.Context) {
		filepath := c.Param("filepath")
		c.File(fileDir + filepath)
	})

	r.Run(":4000")
}
