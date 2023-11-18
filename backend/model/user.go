package model

import (
	"time"
)

// gormを使用する
type User struct {
	ID        uint      `json:"id" gorm:"primary_key" `
	Email     string    `json:"email" gorm:"unique"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type UserResponse struct {
	ID    uint   `json:"id" gorm:"primary_key" `
	Email string `json:"email" gorm:"unique"`
}
