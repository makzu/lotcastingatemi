# frozen_string_literal: true

class CharacterTraitPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end
end
