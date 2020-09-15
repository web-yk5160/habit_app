class CategoriesController < ApplicationController
  def index
    @categories = Category.order(id: :asc)
  end

  def show
    @category= Category.find(params['id'])
    @templates = Template.where(category_id: params['id'])
  end
end
