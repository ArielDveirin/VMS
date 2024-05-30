package main

import (
	controllers "backend/Controllers"
	dbOperations "backend/DBOperations"
	initializers "backend/initializers"
	"backend/middleware"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func checkAdmin(c *gin.Context) {

	check := middleware.IsAdmin(c)
	fmt.Println("CHECK::::::", check)
	if check {
		c.JSON(http.StatusOK, gin.H{
			"message": "User IS ADMIN",
		})
		fmt.Println("User IS ADMIN")

	} else {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "User IS NOT ADMIN",
		})
		fmt.Println("User IS NOT ADMIN")
	}
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

	r.POST("/addsource", dbOperations.AddSource)

	r.POST("/deletesource", dbOperations.DeleteItem)

	r.GET("/isAdmin", checkAdmin)

	r.GET("/getUsers", middleware.RequireAuth, dbOperations.GetUsers)

	r.POST("/deleteUser", checkAdmin, middleware.RequireAuth, controllers.DeleteUser)
	r.POST("/EditUser", checkAdmin, middleware.RequireAuth, controllers.EditUser)

	r.Run()
}
