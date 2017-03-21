class Player < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :chronicles, dependent: :destroy
  has_many :characters, dependent: :destroy
  has_many :qcs,        dependent: :destroy
end
