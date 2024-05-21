package controllers

import (
	"backend/initializers"
	"backend/models"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {

	jsonData, err := io.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var body models.User

	parseErr := json.Unmarshal(jsonData, &body)

	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}

	var user models.User
	initializers.DB.First(&user, "email = ?", body.Email)

	if user.ID != 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "this email aready exists",
		})
		return
	}

	//hash the password

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "problem hashing password",
		})
		return
	}

	// create user record
	if body.Permission == "" || body.Permission == "client" {
		body.Permission = "client"
	}

	newuser := models.User{Email: body.Email, Password: string(hash), Permission: body.Permission, Firstname: body.Firstname, Lastname: body.Lastname}
	fmt.Println("Email:", body.Email)
	// Password is not printed intentionally for security reasons
	fmt.Println("Permission:", body.Permission)
	fmt.Println("Firstname:", body.Firstname)
	fmt.Println("Lastname:", body.Lastname)
	/*
			Id         string
		Email      string
		Password   string
		FirstName  string
		LastName   string
		Permission string
	*/

	result := initializers.DB.Create(&newuser)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "USER COULD NOT BE CREATED",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "USER CREATED",
	})
}

func Login(c *gin.Context) {
	jsonData, err := io.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var body models.User

	parseErr := json.Unmarshal(jsonData, &body)

	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}

	var user models.User
	initializers.DB.First(&user, "email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Email incorrect",
		})
		return
	}

	//check if both the password matches or not

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Email or Password incorrect",
		})
		fmt.Println("Incorrect pass")

		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userid":  user.ID,
		"exp":     time.Now().Add(time.Hour * 24 * 30).Unix(),
		"isAdmin": user.Permission,
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Token string could not be created",
		})
		return
	}
	// Send response with user details and token
	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   tokenString,
		"user":    user, // Include user details in the response
	})

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("serviceToken", tokenString, 3600*24*30, "", "", false, true)
	fmt.Println(body.Email + " -> Logged in.")
}

func Logout(c *gin.Context) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userid":  -1,
		"exp":     time.Now().Add(-time.Hour).Unix(),
		"isAdmin": "client",
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Token string could not be created",
		})
		return
	}
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Auth", tokenString, 3600*24*30, "", "", false, true)

}

func EditUser(c *gin.Context) {
	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var body models.User

	parseErr := json.Unmarshal(jsonData, &body)

	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}

	//result := initializers.DB.Save(&newItem)
	result := initializers.DB.Model(&body).Where("id = ?", body.ID).Updates(models.User{Email: body.Email, Password: body.Password})
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "USER COULD NOT BE UPDATED",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "USER UPDATED",
	})

}

func DeleteUser(c *gin.Context) {
	jsonData, err := io.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var body models.User

	parseErr := json.Unmarshal(jsonData, &body)
	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}

	//result := initializers.DB.Save(&newItem)
	result := initializers.DB.Unscoped().Where(&body).Delete(&body)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "USER COULD NOT BE DELETED",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "ITEM DELETED",
	})

}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{
		"message": user,
	})
}
