class BattlegroupSerializer < ActiveModel::Serializer
  attributes :id, :qc_id, :name, :size, :might, :drill, :perfect_morale, :magnitude_current
end
