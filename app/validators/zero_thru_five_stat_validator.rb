# frozen_string_literal: true

# Validator for Abilities and other traits that go zero to five
class ZeroThruFiveStatValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.nil?
      record.errors[attribute] << "#{attribute} cannot be nil."
      return
    end

    if value.negative?
      record.errors[attribute] << (options[:message] || "#{attribute} cannot be negative")
    elsif value > 5
      record.errors[attribute] << (options[:message] || "#{attribute} cannot be greater than 5")
    end
  end
end
