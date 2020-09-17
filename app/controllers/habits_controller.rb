class HabitsController < ApplicationController
  before_action :move_to_index, except: :index

  def index
    @habits = Habit.where(user_id:current_user.id)
  end

  def show
    @habit = Habit.find(params['id'])
  end

  def new
    @habit = Habit.new
  end

  def create
    habit = Habit.create(habit_params)
    if habit.save
      redirect_to habits_path
      flash[:success] = '習慣を作成しました。'
    else
      if params[:name].blank?
        flash[:danger] = '習慣名を入力してください。'
        render :new
      end
    end
  end

  def edit
    @habit = Habit.find(params['id'])
  end

  def update
    habit = Habit.find(params['id'])
    habit.update(habit_params)
    redirect_to(habit)
  end

  def destroy
    habit = Habit.find(params['id'])
    habit.destroy
    redirect_to(habits_path)
  end

  def move_to_index
    redirect_to action: :index unless user_signed_in?
  end

  def template
    @templates = Template.where(id: params[:id])
    @templates.each do |template|
      @template_name = template.name
    end
  end

  def new_template
    if Habit.create(template_params)
      redirect_to habits_path
      flash[:success] = '習慣を作成しました。'
    else
      if params[:name].blank?
        flash[:danger] = '習慣名を入力してください。'
        render :new
      end
    end
  end

  private

  def habit_params
    params.require(:habit).permit(:name, :start_date, :note, :time_period).merge(user_id: current_user.id)
  end

  def template_params
    params.permit(:name, :start_date, :note, :time_period).merge(user_id: current_user.id)
  end
end
