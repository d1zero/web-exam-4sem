from rest_framework import serializers
from artists.serializers import ArtistSerializer
from tracks.serializers import TrackSerializer
from .models import Album


class AlbumSerializer(serializers.ModelSerializer):
    artists_data = ArtistSerializer(source='artists', many=True)
    tracks_data = TrackSerializer(source='track', many=True)

    class Meta:
        model = Album
        exclude = ['artists', 'track']
