import pandas as pd
from typing import Dict, List, Optional
import logging
from pathlib import Path
import os

class TransitDataService:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(TransitDataService, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if self._initialized:
            return
            
        self.logger = logging.getLogger(__name__)
        
        # Get the absolute path to the data directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        data_dir = os.path.join(os.path.dirname(current_dir), 'data')
        
        # Load the data files
        self.trips_df = pd.read_csv(os.path.join(data_dir, 'trips.txt'))
        self.stops_df = pd.read_csv(os.path.join(data_dir, 'stops.txt'))
        self.stop_times_df = pd.read_csv(os.path.join(data_dir, 'stop_times.txt'))
        
        # Convert times to datetime for easier manipulation
        self.stop_times_df['arrival_time'] = pd.to_datetime(self.stop_times_df['arrival_time'], format='%H:%M:%S').dt.time
        self.stop_times_df['departure_time'] = pd.to_datetime(self.stop_times_df['departure_time'], format='%H:%M:%S').dt.time
        
        self._initialized = True

    def get_nearby_stops(self, lat: float, lon: float, radius_km: float = 5.0) -> List[Dict]:
        """Find stops within a radius of the given coordinates."""
        self.stops_df['distance'] = (
            ((self.stops_df['stop_lat'] - lat) ** 2 + 
             (self.stops_df['stop_lon'] - lon) ** 2) ** 0.5 * 111
        )
        
        nearby = self.stops_df[self.stops_df['distance'] <= radius_km].copy()
        return nearby.to_dict('records')

    def get_next_departures(self, stop_id: int, limit: int = 5) -> List[Dict]:
        """Get next departures from a specific stop."""
        departures = self.stop_times_df[self.stop_times_df['stop_id'] == stop_id].copy()
        departures = departures.sort_values('departure_time')
        departures = departures.head(limit)
        
        departures = departures.merge(self.trips_df[['trip_id', 'trip_headsign']], on='trip_id')
        
        return departures.to_dict('records')

    def find_route(self, from_stop: int, to_stop: int) -> Optional[List[Dict]]:
        """Find a route between two stops."""
        from_times = self.stop_times_df[self.stop_times_df['stop_id'] == from_stop]
        to_times = self.stop_times_df[self.stop_times_df['stop_id'] == to_stop]
        
        common_trips = pd.merge(
            from_times[['trip_id', 'departure_time']], 
            to_times[['trip_id', 'arrival_time']],
            on='trip_id'
        )
        
        if common_trips.empty:
            return None
            
        route_info = common_trips.merge(
            self.trips_df[['trip_id', 'trip_headsign']], 
            on='trip_id'
        )
        
        return route_info.to_dict('records')