class MeetingsController < ApplicationController
  before_action :set_meeting, only: %i[ show update destroy ]

  # GET /meetings
  def index
    @meetings = Meeting.all

    render json: @meetings
  end

  # GET /meetings/1
  def show
    render json: @meeting, include_associations: true
  end

  # POST /meetings
  def create
    @meeting = Meeting.new(meeting_params)

    if @meeting.save
      render json: @meeting, status: :created, location: @meeting
    else
      render json: @meeting.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /meetings/1
  def update
    if @meeting.update(meeting_params)
      render json: @meeting
    else
      render json: @meeting.errors, status: :unprocessable_entity
    end
  end

  # DELETE /meetings/1
  def destroy
    @meeting.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_meeting
    @meeting = Meeting.includes(:scholarship, :admin, :participants).find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def meeting_params
    params.expect(meeting: [:admin_id, :scholarship_id, :title, :description, :status, :date, :meet_type, :meeting_link])
  end
end
