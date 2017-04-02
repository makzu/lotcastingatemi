class Api::V1::PlayersController < Api::V1::BaseController
  before_action :set_player, only: [:show]

  def show
    render json: @player.as_json( include: {
      characters: { include: [:weapons, :merits ]},
      qcs: { include: [ :qc_attacks, :qc_merits ]}
    })
  end

  private
  def set_player
    @player = Player.find(params[:id])
  end
end
