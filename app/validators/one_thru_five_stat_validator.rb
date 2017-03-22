class OneThruFiveStatValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.nil?
      record.errors[attribute] << "#{attribute} cannot be nil."
      return
    end
    unless value > 0
      record.errors[attribute] << (options[:message] || "#{attribute} cannot be less than one")
    end
    unless value <= 5
      record.errors[attribute] << (options[:message] || "#{attribute} cannot be greater than 5")
    end
  end
end
