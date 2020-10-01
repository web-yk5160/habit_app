class HabitsController < ApplicationController
  before_action :move_to_index, except: :index
  before_action :set_habit, only: [:show, :edit, :update, :destroy]

  def index
    @habits = Habit.where(user_id:current_user.id)
    @habits.each do |habit|
      @habit = habit
    end

    # start_dateカラムのみを抽出
    search_year = Habit.pluck(:start_date)
    year_array = []
    search_year.each do |search|
      search_day = search
      search_year = search_day
      year_array << search_year
    end
    # 重複を削除してソート
    @year_array = year_array.uniq.sort
    last_year = @year_array[0]
    @first_view = Habit.where(user_id: current_user.id).where(start_date: last_year)
    gon.habits = @habits
  end

  def show
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
  end

  def update
    @habit.update(habit_params)
    redirect_to(habits_path)
  end

  def destroy
    @habit.destroy
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

  def select_year
    @select_year = Habit.where(user_id: current_user.id).where(start_date: "#{params[:keyword]}")
  end

  def done
    @done = Habit.where(user_id: current_user.id).where(id: "#{params[:keyword]}")
    @done[0].increment!(:done).update(status: 1)
  end

  def redo
    @redo = Habit.where(user_id: current_user.id).where(id: "#{params[:keyword]}")
    @redo[0].decrement!(:done).update(status: 0)
  end

  private

  def habit_params
    params.require(:habit).permit(:name, :start_date, :note, :time_period, :goal, :status, :done).merge(user_id: current_user.id)
  end

  def template_params
    params.permit(:name, :start_date, :note, :time_period, :goal, :done).merge(user_id: current_user.id)
  end

  def set_habit
    @habit = Habit.find(params['id'])
  end
end
