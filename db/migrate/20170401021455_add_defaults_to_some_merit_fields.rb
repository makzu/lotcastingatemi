class AddDefaultsToSomeMeritFields < ActiveRecord::Migration[5.1]
  def change
    change_column_default :merits, :name, ""
    change_column_default :merits, :merit_name, ""
    change_column_default :merits, :description, ""
    change_column_default :merits, :prereqs, ""
    change_column_default :merits, :ref, "Core p.xyz"
    change_column_default :qc_merits, :body, ""
    change_column_default :qc_merits, :ref, ""
  end
end
