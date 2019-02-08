require 'test_helper'

class DailyTargetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @daily_target = daily_targets(:one)
  end

  test "should get index" do
    get daily_targets_url
    assert_response :success
  end

  test "should get new" do
    get new_daily_target_url
    assert_response :success
  end

  test "should create daily_target" do
    assert_difference('DailyTarget.count') do
      post daily_targets_url, params: { daily_target: { calories: @daily_target.calories, carbs: @daily_target.carbs, fats: @daily_target.fats, proteins: @daily_target.proteins, user_id: @daily_target.user_id } }
    end

    assert_redirected_to daily_target_url(DailyTarget.last)
  end

  test "should show daily_target" do
    get daily_target_url(@daily_target)
    assert_response :success
  end

  test "should get edit" do
    get edit_daily_target_url(@daily_target)
    assert_response :success
  end

  test "should update daily_target" do
    patch daily_target_url(@daily_target), params: { daily_target: { calories: @daily_target.calories, carbs: @daily_target.carbs, fats: @daily_target.fats, proteins: @daily_target.proteins, user_id: @daily_target.user_id } }
    assert_redirected_to daily_target_url(@daily_target)
  end

  test "should destroy daily_target" do
    assert_difference('DailyTarget.count', -1) do
      delete daily_target_url(@daily_target)
    end

    assert_redirected_to daily_targets_url
  end
end
