package models

import "gorm.io/gorm"

type Source struct {
	gorm.Model
	Name      string
	MultiCastAddress   string
	Port  string
}
