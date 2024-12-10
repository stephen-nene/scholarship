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
            # For numeric major filtering in SQLite
            if value.is_a?(String)
              # Convert string to integer
              major_id = value.to_i
              collection = collection.where("major LIKE ?", "%#{major_id}%")
            elsif value.is_a?(Array)
              # Convert array values to integers and create OR conditions
              major_ids = value.map(&:to_i)
              collection = collection.where(
                major_ids.map { "major LIKE ?" }.join(" OR "),
                *major_ids.map { |id| "%#{id}%" }
              )
            end
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
