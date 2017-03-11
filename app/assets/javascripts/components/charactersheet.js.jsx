class Charactersheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { character: {} };
  }

  componentDidMount() {
    $.getJSON('/api/v1/characters/1.json', (response) => { this.setState({ character: response }) });
  }

  render() {
    return (
      <div>
        <h1>{this.state.character.name}</h1>

        <CombatBlock character={this.state.character} />


        <h3>Attributes</h3>
        <ul>
          <li>Strength: {this.state.character.attr_strength}</li>
          <li>Dexterity: {this.state.character.attr_dexterity}</li>
          <li>Stamina: {this.state.character.attr_stamina}</li>
          <li>Charisma: {this.state.character.attr_charisma}</li>
          <li>Manipulation: {this.state.character.attr_manipulation}</li>
          <li>Appearance: {this.state.character.attr_appearance}</li>
          <li>Intelligence: {this.state.character.attr_intelligence}</li>
          <li>Wits: {this.state.character.attr_wits}</li>
          <li>Perception: {this.state.character.attr_perception}</li>
        </ul>

        <h3>Abilities</h3>
        <ul>
          <li>Archery: { this.state.character.abil_archery }</li>
          <li>Athletics: { this.state.character.abil_athletics }</li>
          <li>Awareness: { this.state.character.abil_awareness }</li>
          <li>Brawl: { this.state.character.abil_brawl }</li>
          <li>Bureaucracy: { this.state.character.abil_bureaucracy }</li>
          <li>Craft: TODO</li>
          <li>Dodge: { this.state.character.abil_dodge }</li>
          <li>Integrity: { this.state.character.abil_integrity }</li>
          <li>Investigation: { this.state.character.abil_investigation }</li>
          <li>Larceny: { this.state.character.abil_larceny }</li>
          <li>Linguistics: { this.state.character.abil_linguistics }</li>
          <li>Lore: { this.state.character.abil_lore }</li>
          <li>Medicine: { this.state.character.abil_medicine }</li>
          <li>Melee: { this.state.character.abil_melee }</li>
          <li>Occult: { this.state.character.abil_occult }</li>
          <li>Performance: { this.state.character.abil_performance }</li>
          <li>Presence: { this.state.character.abil_presence }</li>
          <li>Resistance: { this.state.character.abil_resistance }</li>
          <li>Ride: { this.state.character.abil_ride }</li>
          <li>Sail: { this.state.character.abil_sail }</li>
          <li>Socialize { this.state.character.abil_socialize }</li>
          <li>Stealth: { this.state.character.abil_stealth }</li>
          <li>Survival: { this.state.character.abil_survival }</li>
          <li>Thrown: { this.state.character.abil_thrown }</li>
          <li>War: { this.state.character.abil_war }</li>
        </ul>

        <h3>Health/Willpower</h3>
        <ul>
          <li>{ this.state.character.health_level_0s } x0</li>
          <li>{ this.state.character.health_level_1s } x1</li>
          <li>{ this.state.character.health_level_2s } x2</li>
          <li>{ this.state.character.health_level_4s } x4</li>
          <li>{ this.state.character.health_level_incap } incap</li>
          <li>
            { this.state.character.willpower_temporary }
            /
            { this.state.character.willpower_permanent }
            Willpower
          </li>
        </ul>
      </div>
    );
  }
}
