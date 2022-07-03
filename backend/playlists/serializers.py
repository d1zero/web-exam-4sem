from rest_framework import serializers
from tracks.serializers import TrackSerializer
from .models import Playlist


class PlaylistSerializer(serializers.ModelSerializer):
    tracks_data = TrackSerializer(source='track', many=True)

    class Meta:
        model = Playlist
        exclude = ['track']
