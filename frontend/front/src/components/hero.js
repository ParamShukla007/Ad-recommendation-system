import React, { useState } from 'react';
import { styled } from 'styled-components';

const HeroContainer = styled.div`
  display: flex;
  gap: 30px;
  padding: 40px;
  width: 95%;
  margin: 0 auto;
  margin-top: -6px;
`;

const ImagePlaceholder = styled.div`
  width: 400px;
  height: 700px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
`;

const Card = styled.div`
  flex: 1;
  border: 6px solid black;
  padding: 40px;
  background-color: white;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CardTitle = styled.h2`
  margin: 0;
  color: black;
  font-size: 6rem;
  font-weight: 500;
  font-family: 'Times New Roman', Times, serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-feature-settings: "lnum";
  font-style: normal;
  line-height: 1.2;
  text-align: left;
  align-self: flex-start;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const UrlInput = styled.input`
  flex: 1;
  padding: 15px;
  border: 3px solid black;
  font-size: 1.1rem;
  outline: none;
  
  &:focus {
    border-color: #000;
  }
`;

const CheckButton = styled.button`
  padding: 15px 40px;
  background-color: black;
  color: white;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 500;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ResultsSection = styled.div`
  width: 90%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SummaryCard = styled.div`
  border: 6px solid black;
  padding: 30px;
  background-color: white;
`;

const SummaryTitle = styled.h2`
  font-family: 'Times New Roman', Times, serif;
  font-size: 2.2rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 20px 0;
  text-align: left;
`;

const SummaryText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  text-align: left;
`;

const KeywordsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;  // Slightly increased gap for better spacing between rectangular tags
  justify-content: flex-start;
  align-items: flex-start;
`;

const Keyword = styled.span`
  background-color: black;
  color: white;
  padding: 8px 16px;
  border-radius: 0;  // Changed from 20px to 0 to make it rectangular
  font-size: 0.9rem;
  font-family: 'Times New Roman', Times, serif;  // Added Times New Roman font
  letter-spacing: 0.05em;  // Added slight letter spacing for better readability
`;

const AdsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const AdCard = styled.div`
  border: 4px solid black;
  padding: 20px;
  background-color: white;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AdTitle = styled.h3`
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  text-align: left;
`;

const AdDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  text-align: left;
`;

const AdSimilarity = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #eee;
  text-align: left;
`;

const AdExplanation = styled.div`
  font-size: 1.08rem;
  font-family: 'Times New Roman', Times, serif;
  color: #fff;
  margin-top: 16px;
  text-align: left;
  background: #111;
  padding: 18px 20px;
  border-radius: 0;
  border: 2px solid #000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  line-height: 1.7;
  font-weight: 500;
  letter-spacing: 0.01em;
`;

function Hero() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/extract/summarizeAndExtract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroContainer>
        <ImagePlaceholder />
        <Card>
          <CardTitle>Check the ads which are for your webpage</CardTitle>
          <InputContainer>
            <UrlInput 
              type="url" 
              placeholder="Enter your webpage URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <CheckButton 
              onClick={handleCheck}
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Check'}
            </CheckButton>
          </InputContainer>

          {error && (
            <div style={{ color: 'red', marginTop: '20px' }}>
              Error: {error}
            </div>
          )}
        </Card>
      </HeroContainer>

      {result && (
        <ResultsSection>
          {/* Summary Card */}
          <SummaryCard>
            <SummaryTitle>Webpage Summary</SummaryTitle>
            <SummaryText>{result.summary}</SummaryText>
            <KeywordsContainer>
              {result.keywords.map((keyword, index) => (
                <Keyword key={index}>{keyword}</Keyword>
              ))}
            </KeywordsContainer>
          </SummaryCard>

          {/* Recommended Ads Section */}
          <SummaryCard>
            <SummaryTitle>Recommended Ads</SummaryTitle>
            <AdsGrid>
              {result.matchedAds && result.matchedAds.map((ad) => (
                <AdCard key={ad._id}>
                  <AdTitle>{ad.title}</AdTitle>
                  <AdDescription>{ad.description}</AdDescription>
                  <KeywordsContainer>
                    {ad.keywords.map((keyword, index) => (
                      <Keyword key={index}>{keyword}</Keyword>
                    ))}
                  </KeywordsContainer>
                  <AdSimilarity>
                    Match Score: {Math.round(ad.similarity * 100)}%
                  </AdSimilarity>
                  <div style={{marginTop: '8px', marginBottom: '0', fontWeight: 'bold', color: '#111', fontFamily: 'Times New Roman, Times, serif', fontSize: '1.08rem', textAlign: 'left', paddingLeft: '0', width: '100%'}}>Why this Ad?</div>
                  <AdExplanation>
                    {ad.explanation}
                  </AdExplanation>
                </AdCard>
              ))}
            </AdsGrid>
          </SummaryCard>
        </ResultsSection>
      )}
    </>
  );
}

export default Hero;