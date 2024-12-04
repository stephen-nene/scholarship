class ScholarshipsController < ApplicationController
  before_action :set_scholarship, only: %i[show update destroy]

  # GET /scholarships
  def index
    @scholarships = Scholarship.all

    # Apply filters if present
    @scholarships = @scholarships.where(status: params[:status]) if params[:status]
    @scholarships = @scholarships.where(level: params[:level]) if params[:level]
    @scholarships = @scholarships.where(major: params[:major]) if params[:major]
    @scholarships = @scholarships.where(country: params[:country]) if params[:country]

    @scholarships = @scholarships.page(params[:page])

    render json: { scholarships: @scholarships, meta: pagination_meta(@scholarships) }, each_serializer: ScholarshipSerializer
  end

  # GET /scholarships/1
  def show
    render json: @scholarship
  end

  # POST /scholarships
  def create
    @scholarship = Scholarship.new(scholarship_params)

    if @scholarship.save
      render json: @scholarship, status: :created, location: @scholarship
    else
      render json: @scholarship.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /scholarships/1
  def update
    if @scholarship.update(scholarship_params)
      render json: @scholarship
    else
      render json: @scholarship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /scholarships/1
  def destroy
    @scholarship.destroy!
  end

  private

  def set_scholarship
    @scholarship = Scholarship.find_by(id: params[:id]) 
  end

  def scholarship_params
    params.require(:scholarship).permit(
      :title,
      :funding_amount,
      :deadline,
      :status,
      :contact_email,
      :application_link,
      :country,
      :level,
      :major,
      description: {},
      eligibility_criteria: {},
    )
  end

  # Pagination meta data
  def pagination_meta(scholarships)
    {
      total_count: scholarships.total_count,
      total_pages: scholarships.total_pages,
      next_page: scholarships.next_page,
      current_page: scholarships.current_page,
      per_page: scholarships.limit_value,
    }
  end
end
