# app/controllers/concerns/filterable.rb
module Filterable
  extend ActiveSupport::Concern

  included do
    # Apply filters dynamically based on query parameters
    def apply_filters(collection, allowed_filters = {})
      allowed_filters.each do |param_key, column_name|
        next unless params[param_key].present?

        value = params[param_key]

        begin
          # Handle different data types or specific filter logic
          case column_name
          when Array
            # For columns like JSON arrays or enums, use IN queries
            collection = collection.where("#{column_name[0]} @> ARRAY[?]::integer[]", value) if value.is_a?(Array)
          when Hash
            # Advanced filtering for JSON fields
            collection = collection.where("#{column_name[:json_field]} ->> '#{column_name[:key]}' = ?", value)
          else
            # Default case for simple columns
            collection = collection.where(column_name => value)
          end
        rescue ActiveRecord::StatementInvalid => e
          Rails.logger.error "Invalid filter parameter: #{param_key}, Error: #{e.message}"
          raise ActionController::BadRequest, "Invalid filter parameter: #{param_key}"
        end
      end

      collection
    end
  end
end
