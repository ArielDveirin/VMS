package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email      string
	Password   string
	Firstname  string
	Lastname   string
	Permission string
}
