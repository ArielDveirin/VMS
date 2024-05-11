package main

import (
	controllers "backend/Controllers"
	dbOperations "backend/DBOperations"
	initializers "backend/initializers"
	"backend/middleware"
	"fmt"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	fmt.Println("#### GO Server Running ####")

	r := gin.Default()

	r.Use(middleware.CorsHeader)

	r.POST("/register", controllers.Signup)
	r.POST("/login", controllers.Login)

	r.GET("/validate", middleware.RequireAuth, controllers.Validate)

	r.GET("/getSources", dbOperations.GetSources)

	r.GET("/playSource", dbOperations.GetSources)

	r.POST("/editsource", dbOperations.EditSource)

	r.POST("/deletesource", dbOperations.DeleteItem)

	r.Run()
}
