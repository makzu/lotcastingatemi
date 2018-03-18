class ChangeSomeDefaults < ActiveRecord::Migration[5.1]
  def change
    # 0 size is a silly default
    change_column_default :battlegroups, :size,      from: 0, to: 1
    change_column_default :battlegroups, :drill,     from: 0, to: 1
    change_column_default :battlegroups, :magnitude, from: 7, to: 8
    rename_column         :battlegroups, :magnitude_current, :health_levels

    # Mortals default to 3 willpower
    change_column_default :characters, :willpower_temporary, from: 5, to: 3
    change_column_default :characters, :willpower_permanent, from: 5, to: 3

    change_column_default :merits, :name,       from: "New Merit",  to: ""
    change_column_default :merits, :merit_name, from: "",           to: "New Merit"
    change_column_default :merits, :ref,        from: "Core p.xyz", to: "Core p.157-169"
    rename_column         :merits, :name, :label

    # Make QC Charm defaults match PC Charm defaults
    change_column_default :qc_charms, :cost,   from: "",             to: "0m"
    change_column_default :qc_charms, :timing, from: "supplemental", to: "reflexive"

    # Terrestrial, etc is used by the book way more often
    change_column_default :spells, :circle, from: "emerald", to: "terrestrial"

    remove_foreign_key :qc_attacks, column: :qc_attackable_id
  end
end
