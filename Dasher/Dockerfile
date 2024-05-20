# Use the coconut/ffmpeg image as a base
FROM coconut/ffmpeg

# Set the working directory
WORKDIR /workspace

# Copy any local files to the container (optional)
# COPY . /workspace

# Set the entry point to ffmpeg
ENTRYPOINT ["ffmpeg"]

# Define the command to run when the container starts
CMD ["ffmpeg", "-h"]