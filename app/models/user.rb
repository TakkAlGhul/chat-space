class User < ApplicationRecord
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :messages
  has_many :group_users
  has_many :groups, through: :group_users

  validates :name, presence: true
  validates :password, length: { minimum: 8 },allow_nil: true
end
