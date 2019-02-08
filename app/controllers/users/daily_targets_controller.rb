module Users
  class DailyTargetsController < ApplicationController
    before_action :set_daily_target, only: [:show, :edit, :update, :destroy]
    before_action :set_user, only: [:show, :edit, :update, :destroy, :new, :create]

    # GET /daily_targets
    # GET /daily_targets.json
    def index
      @daily_targets = DailyTarget.all
    end

    # GET /daily_targets/1
    # GET /daily_targets/1.json
    def show
    end

    # GET /daily_targets/new
    def new
      @daily_target = @user.daily_targets.new
    end

    # GET /daily_targets/1/edit
    def edit
    end

    # POST /daily_targets
    # POST /daily_targets.json
    def create
      @daily_target = @user.daily_targets.new(daily_target_params)

      respond_to do |format|
        if @daily_target.save
          format.html { redirect_to [@user, @daily_target], notice: 'Daily target was successfully created.' }
          format.json { render :show, status: :created, location: @daily_target }
        else
          format.html { render :new }
          format.json { render json: @daily_target.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /daily_targets/1
    # PATCH/PUT /daily_targets/1.json
    def update
      respond_to do |format|
        if @daily_target.update(daily_target_params)
          format.html { redirect_to [@user, @daily_target], notice: 'Daily target was successfully updated.' }
          format.json { render :show, status: :ok, location: @daily_target }
        else
          format.html { render :edit }
          format.json { render json: @daily_target.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /daily_targets/1
    # DELETE /daily_targets/1.json
    def destroy
      @daily_target.destroy
      respond_to do |format|
        format.html { redirect_to user_daily_targets_url, notice: 'Daily target was successfully destroyed.' }
        format.json { head :no_content }
      end
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_daily_target
        @daily_target = DailyTarget.find(params[:id])
      end

      def set_user
        @user = User.find(params[:user_id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def daily_target_params
        params.require(:daily_target).permit(:fats, :carbs, :proteins, :calories)
      end
  end
end
