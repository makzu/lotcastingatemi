class ChronicleSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :st, serializer: PlayerSerializer
  has_many :players
  has_many :characters
  has_many :qcs
  has_many :battlegroups
end
