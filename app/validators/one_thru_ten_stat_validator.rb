# frozen_string_literal: true

# Validator for Attributes and other traits that go one through ten
class OneThruTenStatValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.nil?
      record.errors.add(attribute, "#{attribute} cannot be nil.")
      return
    end

    if value < 1
      record.errors.add(attribute, (options[:message] || "#{attribute} cannot be less than one"))
    elsif value > 10
      record.errors.add(attribute, (options[:message] || "#{attribute} cannot be greater than 10"))
    end
  end
end
