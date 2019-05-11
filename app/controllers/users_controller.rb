class UsersController < ApplicationController
 
  def update
    if current_user.update(user_params)
      redirect_to root_path 
    else
      render :edit
    end
  end

  def index
    @users = User.where("ID NOT IN (#{current_user.id})").where('name LIKE(?)', "%#{params[:keyword]}%").limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end



  private 
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
