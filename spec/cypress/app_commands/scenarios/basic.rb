# frozen_string_literal: true

# You can setup your Rails state here
# MyModel.create name: 'something'

p1 = Player.find_or_create_by(email: 'volfer@iam.net')
p1.update(display_name: 'volfer')

CypressDev::SmartFactoryWrapper.create(:solar_character, player: p1, name: 'Testy Testerson')
