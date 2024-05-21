# First stage: build the Go application
FROM golang:1.20.5 AS builder

# Install necessary packages for FFmpeg
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y net-tools && \
    apt-get clean 

# Download and install FFmpeg
RUN apt-get update -qq && apt-get install ffmpeg -y


# Set up Go environment
ENV GOPATH=/go
ENV PATH=$GOPATH/bin:/usr/local/go/bin:$PATH

# Create app directory
WORKDIR /app

# Copy Go source code
COPY dasher.go .

# Initialize go module and build the app
RUN go mod init my-go-project
RUN go mod tidy
RUN go build -o myapp dasher.go

# Second stage: create the final image using opencoconut/ffmpeg
#FROM opencoconut/ffmpeg:latest

# Set up work directory
#WORKDIR /app

# Copy the built Go binary from the builder stage
#COPY --from=builder /app/myapp .

# Run the Go application
CMD ["./myapp"]

#CMD ["ffmpeg -i udp://239.0.0.1:12345?localaddr=172.20.0.2 -vf scale=640:-2 -c:v libx264 -b:v 500k -profile:v main -preset fast -f dash -min_seg_duration 2000000 stream.mpd"]

