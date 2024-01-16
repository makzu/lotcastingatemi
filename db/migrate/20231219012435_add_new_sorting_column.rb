class AddNewSortingColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE characters SET sorting = sort_order')
    add_column :characters, :chronicle_sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE characters SET chronicle_sorting = chronicle_sort_order')

    add_column :charms, :sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE charms SET sorting = sort_order')
    add_column :merits, :sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE merits SET sorting = sort_order')
    add_column :weapons, :sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE weapons SET sorting = sort_order')
    add_column :spells, :sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE spells SET sorting = sort_order')
    add_column :poisons, :sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE poisons SET sorting = sort_order')

    add_column :qcs, :sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE qcs SET sorting = sort_order')
    add_column :qcs, :chronicle_sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE qcs SET chronicle_sorting = chronicle_sort_order')

    add_column :qc_attacks, :sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE qc_attacks SET sorting = sort_order')
    add_column :qc_charms, :sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE qc_charms SET sorting = sort_order')
    add_column :qc_merits, :sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE qc_merits SET sorting = sort_order')

    add_column :battlegroups, :sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE battlegroups SET sorting = sort_order')
    add_column :battlegroups, :chronicle_sorting, :integer
    ActiveRecord::Base.connection.execute('UPDATE battlegroups SET chronicle_sorting = chronicle_sort_order')
  end
end
