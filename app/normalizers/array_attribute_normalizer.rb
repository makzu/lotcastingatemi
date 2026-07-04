# frozen_string_literal: true

# Ensures array attributes like Specialty have unique ids
module ArrayAttributeNormalizer
  def self.call(value)
    value.map { |v| { id: Nanoid.generate(size: 5) }.merge(v) }
  end
end
