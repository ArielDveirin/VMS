package middleware

import (
	"backend/initializers"
	"backend/models"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func RequireAuth(c *gin.Context) {
	tokenString, err := c.Cookie("sessionToken")
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
	//fmt.Println("Token String: ", tokenString)
	if tokenString != "0" {
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Don't forget to validate the alg is what you expect:
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}

			// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
			return []byte(os.Getenv("SECRET")), nil
		})
		if err != nil {
			fmt.Println("\n\n\n", token)
		}
		fmt.Println("\n\n\n", token)
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			if float64(time.Now().Unix()) > claims["exp"].(float64) {
				c.AbortWithStatus(http.StatusUnauthorized)
			}
			var user models.User
			initializers.DB.First(&user, claims["userid"])

			c.Set("user", user)
			c.Next()

		} else {
			fmt.Println("Bad Request")
			c.AbortWithStatus(http.StatusUnauthorized)

		}
	} else {
		c.Set("user", "guest")
		c.Next()
	}

}
