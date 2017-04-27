# frozen_string_literal: true

# Validator for Attributes and other traits that go one through five
class OneThruFiveStatValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.nil?
      record.errors[attribute] << "#{attribute} cannot be nil."
      return
    end

    if value < 1
      record.errors[attribute] << (options[:message] || "#{attribute} cannot be less than one")
    elsif value > 5
      record.errors[attribute] << (options[:message] || "#{attribute} cannot be greater than 5")
    end
  end
end
