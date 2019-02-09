module Users
  class DaysController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_day, only: [:show, :edit, :update, :destroy]
    before_action :set_user, only: [:show, :edit, :update, :destroy, :new]

    def params
      request.parameters
    end

    # GET /days
    # GET /days.json
    def index
      @days = Day.all
    end

    # GET /days/1
    # GET /days/1.json
    def show
    end

    # GET /days/new
    def new
      @day = @user.days.find_or_create_by(start_time: params[:date].to_datetime) do |day|
        day.meals = day.fresh_meals
      end
    end

    # GET /days/1/edit
    def edit
    end

    # POST /days
    # POST /days.json
    def create
      @day = Day.new(day_params)

      respond_to do |format|
        if @day.save
          format.html { redirect_to @day, notice: 'Day was successfully created.' }
          format.json { render :show, status: :created, location: @day }
        else
          format.html { render :new }
          format.json { render json: @day.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /days/1
    # PATCH/PUT /days/1.json
    def update
      @day.update(meals: params[:meals])
      #respond_to do |format|
        #if @day.update(day_params)
          #format.html { redirect_to @day, notice: 'Day was successfully updated.' }
          #format.json { render :show, status: :ok, location: @day }
        #else
          #format.html { render :edit }
          #format.json { render json: @day.errors, status: :unprocessable_entity }
        #end
      #end
    end

    # DELETE /days/1
    # DELETE /days/1.json
    def destroy
      @day.destroy
      respond_to do |format|
        format.html { redirect_to days_url, notice: 'Day was successfully destroyed.' }
        format.json { head :no_content }
      end
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_day
        @day = Day.find(params[:id])
      end

      def set_user
        @user = User.find(params[:user_id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def day_params
        params.require(:day).permit(:start_time, :user_id, :meals)
      end
  end
end
