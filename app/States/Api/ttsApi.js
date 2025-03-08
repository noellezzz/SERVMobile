import { apiSlice } from './index';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

const ttsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTextToSpeech: builder.mutation({
      query: ({ text, lang }) => ({
        url: `tts/`,
        method: 'GET',
        params: { text, lang },
        responseHandler: async (response) => {
          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }
          return response.blob();
        },
      }),
      transformResponse: async (blob) => {
        try {
          const fileName = `tts-${Date.now()}.mp3`;
          const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

          const reader = new FileReader();

          return new Promise((resolve, reject) => {
            reader.onload = async () => {
              try {
                const base64data = reader.result.split(',')[1];

                await FileSystem.writeAsStringAsync(fileUri, base64data, {
                  encoding: FileSystem.EncodingType.Base64,
                });

                resolve(fileUri);
              } catch (error) {
                console.error('Error saving audio file:', error);
                reject(error);
              }
            };

            reader.onerror = () => {
              reject(new Error('Failed to read blob data'));
            };

            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error('Error processing audio data:', error);
          throw error;
        }
      },
    }),
  }),
});

export const { useGetTextToSpeechMutation } = ttsApi;