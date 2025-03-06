/**
 * Represents a physical location with address details.
 */
export interface Location {
  /** The primary address line. */
  line1: string;
  
  /** The secondary address line (optional). */
  line2?: string;
  
  /** The postal or ZIP code. */
  zipCode: string;
  
  /** The state or region. */
  state: string;
  
  /** The city name. */
  city: string;
}