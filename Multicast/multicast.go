package main

import (
	"os"
	"os/exec"
)

func main() {

	// Command to run the Docker container
	runMulticast := exec.Command("docker", "run", "--name", "multiCast", "--rm", "--network=vmsnet", "-p", "12345:12345/udp", "-v", "C:\\Users\\user\\Desktop\\ffmpegtest:/ffmpegTest", "opencoconut/ffmpeg", "-re", "-stream_loop", "-1", "-i", "//ffmpegTest/doommusic.mp4", "-vcodec", "copy", "-acodec", "copy", "-f", "mpegts", "udp://239.0.0.1:12345?pkt_size=1316")

	// Set working directory to the directory containing the input file
	runMulticast.Dir = "C:\\Users\\user\\Desktop\\VMS\\Dasher"

	// Set output to current process's standard output
	runMulticast.Stdout = os.Stdout
	runMulticast.Stderr = os.Stderr

	// Execute the run command
	if err := runMulticast.Run(); err != nil {
		panic(err)
	}

}
