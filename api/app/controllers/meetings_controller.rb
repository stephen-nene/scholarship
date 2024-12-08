class MeetingsController < ApplicationController
  before_action :set_meeting, only: %i[ show update destroy ]

  # GET /meetings
  def index
    sort_by = params[:sort_by] || 'meet_type'  # Default sort by created_at
    sort_order = params[:sort_order] || 'asc'   # Default sort order is ascending
  
    @meetings = Meeting.all.order("#{sort_by} #{sort_order}").page(params[:page])

    render json: { 
      meetings: @meetings.map {|meeting| MeetingSerializer.new(meeting)},
      meta: pagination_meta(@meetings) 
    }
  end

  # GET /meetings/1
  def show
    render json: @meeting, include_associations: true
  end

  # POST /meetings36
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

  def pagination_meta(meetings)
    {
      total_count: meetings.total_count,
      total_pages: meetings.total_pages,
      next_page: meetings.next_page,
      current_page: meetings.current_page,
      per_page: meetings.limit_value,
    }
  end
end
