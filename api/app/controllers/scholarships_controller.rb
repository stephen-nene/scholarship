class ScholarshipsController < ApplicationController
  before_action :set_scholarship, only: %i[show update destroy]
  include PaginationAndSerialization
  include Filterable

  # GET /scholarships
  def index
    allowed_filters = {
      status: :status,
      level: :level,
      major: [:major],
      funding_type: :funding_type,
      country: :country,
      min_funding: "funding_amount >= ?", # Custom filter logic for range
      max_funding: "funding_amount <= ?",
      deadline: "deadline >= ?", # For future deadlines
    }
    @scholarships = apply_filters(Scholarship.all, allowed_filters).page(params[:page])
    if @scholarships.empty?
      render json: { errors: "No scholarships found with the provided filters." }, status: :not_found
    else
      render json: {
               scholarships: serialize_collection(@scholarships, ScholarshipSerializer),
               meta: pagination_meta(@scholarships),
             }
    end
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

  # def apply_filters(scholarships)
  #   scholarships = scholarships.where(status: params[:status]) if params[:status]
  #   scholarships = scholarships.where(level: params[:level]) if params[:level]
  #   scholarships = scholarships.where(major: params[:major]) if params[:major]
  #   scholarships = scholarships.by_country(params[:country]) if params[:country]

  #   # Funding range filters
  #   if params[:min_funding] || params[:max_funding]
  #     scholarships = scholarships.by_funding_range(params[:min_funding] || 0, params[:max_funding] || Float::INFINITY)
  #   end

  #   # Deadline filters
  #   if params[:start_date] || params[:end_date]
  #     scholarships = scholarships.where(deadline: (params[:start_date] || Date.min)..(params[:end_date] || Date.max))
  #   end

  #   scholarships
  # end

  def set_scholarship
    @scholarship = Scholarship.find_by(id: params[:id])

    if @scholarship.nil?
      render json: { error: "Scholarship #{params[:id]} not found" }, status: :not_found
    end
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
      :funding_type,
      description: {},
      eligibility_criteria: {},
      major: [],
      target_audience: [],
    )
  end
end
