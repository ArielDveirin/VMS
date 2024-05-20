package main

import (
	"os"
	"os/exec"
)

func main() {

	// Command to run the Docker container
	runDasher := exec.Command("docker", "run", "--name", "dasher", "--rm", "--network=vmsnet", "-p", "54321:54321/udp", "opencoconut/ffmpeg", "-i", "udp://239.0.0.1:12345?localaddr=172.20.0.2", "-vf", "scale=640:-2", "-c:v", "libx264", "-b:v", "500k", "-profile:v", "main", "-preset", "fast", "-f", "dash", "-min_seg_duration", "2000000", "stream.mpd")

	// Set working directory to the directory containing the input file
	runDasher.Dir = "C:\\Users\\user\\Desktop\\VMS\\Dasher"

	// Set output to current process's standard output
	runDasher.Stdout = os.Stdout
	runDasher.Stderr = os.Stderr

	// Execute the run command
	if err := runDasher.Run(); err != nil {
		panic(err)
	}

}
