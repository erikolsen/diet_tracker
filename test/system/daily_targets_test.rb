require "application_system_test_case"

class DailyTargetsTest < ApplicationSystemTestCase
  setup do
    @daily_target = daily_targets(:one)
  end

  test "visiting the index" do
    visit daily_targets_url
    assert_selector "h1", text: "Daily Targets"
  end

  test "creating a Daily target" do
    visit daily_targets_url
    click_on "New Daily Target"

    fill_in "Calories", with: @daily_target.calories
    fill_in "Carbs", with: @daily_target.carbs
    fill_in "Fats", with: @daily_target.fats
    fill_in "Proteins", with: @daily_target.proteins
    fill_in "User", with: @daily_target.user_id
    click_on "Create Daily target"

    assert_text "Daily target was successfully created"
    click_on "Back"
  end

  test "updating a Daily target" do
    visit daily_targets_url
    click_on "Edit", match: :first

    fill_in "Calories", with: @daily_target.calories
    fill_in "Carbs", with: @daily_target.carbs
    fill_in "Fats", with: @daily_target.fats
    fill_in "Proteins", with: @daily_target.proteins
    fill_in "User", with: @daily_target.user_id
    click_on "Update Daily target"

    assert_text "Daily target was successfully updated"
    click_on "Back"
  end

  test "destroying a Daily target" do
    visit daily_targets_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Daily target was successfully destroyed"
  end
end
