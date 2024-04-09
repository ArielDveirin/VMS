package dbOperations

import (
	"backend/initializers"
	"backend/models"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"

	"net/http"

	"github.com/gin-gonic/gin"
)

func AddSource(c *gin.Context) {
	jsonData, err := io.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var body models.Source

	parseErr := json.Unmarshal(jsonData, &body)

	//todo: add exception to wait for bad data - dont allow the user to crash the server!!
	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}
	var source models.Source

	initializers.DB.First(&source, "name = ?", body.Name)

	if source.ID != 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "this Item aready exists",
		})
		return
	}

	newSource := models.Source{Name: body.Name, Port: body.Port, MultiCastAddress: body.MultiCastAddress}

	result := initializers.DB.Create(&newSource)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "ITEM COULD NOT BE CREATED",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "SOURCE CREATED",
	})

}

func GetSources(c *gin.Context) {
	var sources []models.Source
	initializers.DB.Find(&sources)

	c.JSON(http.StatusOK, gin.H{
		"sources": sources,
	})
}

func GetUsers(c *gin.Context) {
	var users []models.User
	initializers.DB.Find(&users)

	c.JSON(http.StatusOK, gin.H{
		"users": users,
	})
}

func EditSource(c *gin.Context) {
	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var body models.Source

	parseErr := json.Unmarshal(jsonData, &body)

	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}

	fmt.Printf("id: %d , name: %s", body.ID, body.Name)

	//result := initializers.DB.Save(&newItem)
	result := initializers.DB.Model(&body).Where("id = ?", body.ID).Updates(models.Source{Name: body.Name, MultiCastAddress: body.MultiCastAddress, Port: body.Port})
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "SOURCE COULD NOT BE UPDATED",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "SOURCE UPDATED",
	})

}

func DeleteItem(c *gin.Context) {
	jsonData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Fatal(err)
	}

	var body models.Source

	parseErr := json.Unmarshal(jsonData, &body)
	fmt.Printf("id: %d , name: %s", body.ID, body.Name)
	if parseErr != nil {

		// if error is not nil
		// print error
		log.Fatal(parseErr)
	}

	//result := initializers.DB.Save(&newItem)
	result := initializers.DB.Unscoped().Where(&body).Delete(&body)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "SOURCE COULD NOT BE UPDATED",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "SOURCE UPDATED",
	})

}
