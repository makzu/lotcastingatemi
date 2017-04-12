# frozen_string_literal: true

class OneThruFiveStatValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.nil?
      record.errors[attribute] << "#{attribute} cannot be nil."
      return
    end

    unless value > 0 # rubocop:disable Style/NumericPredicate
      record.errors[attribute] << (options[:message] || "#{attribute} cannot be less than one")
    end
    unless value <= 5 # rubocop:disable Style/GuardClause
      record.errors[attribute] << (options[:message] || "#{attribute} cannot be greater than 5")
    end
  end
end
