import { useState, useCallback } from 'react'
import { generateSignatureHTML } from './signatureTemplates'
import SignatureForm from './components/SignatureForm'
import SocialLinksForm from './components/SocialLinksForm'
import DesignControls from './components/DesignControls'
import SignaturePreview from './components/SignaturePreview'

const INITIAL_DATA = {
  name: '', title: '', company: '', email: '', phone: '', website: '', photo: '',
  socials: { linkedin: '', twitter: '', instagram: '', facebook: '', youtube: '' },
  cta: { text: '', url: '' },
}

export default function App() {
  const [data, setData] = useState(INITIAL_DATA)
  const [template, setTemplate] = useState('professional')
  const [color, setColor] = useState('#0073EC')
  const [font, setFont] = useState('Arial')

  const fillTestData = () => {
    setData({
      name: 'Jane Smith',
      title: 'Marketing Director',
      company: 'Acme Digital Agency',
      email: 'jane.smith@acmedigital.com',
      phone: '+1 (555) 234-5678',
      website: 'www.acmedigital.com',
      photo: '',
      socials: {
        linkedin: 'https://linkedin.com/in/janesmith',
        twitter: 'https://x.com/janesmith',
        instagram: '',
        facebook: '',
        youtube: '',
      },
      cta: { text: 'Schedule a Call', url: 'https://calendly.com/janesmith/30min' },
    })
  }

  const update = useCallback((field, value) => setData(prev => ({ ...prev, [field]: value })), [])
  const updateSocial = useCallback((key, value) => setData(prev => ({ ...prev, socials: { ...prev.socials, [key]: value } })), [])
  const updateCta = (field, value) => setData(prev => ({ ...prev, cta: { ...prev.cta, [field]: value } }))

  const html = generateSignatureHTML(data, template, color, font)

  return (
    <div className="min-h-screen bg-abyss bg-glow bg-grid">
      <div className="max-w-[1600px] mx-auto px-4 py-12 animate-fadeIn">
        <nav className="mb-8 text-sm text-galactic">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/email-marketing/" className="text-azure hover:text-white transition-colors">Email Marketing</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Email Signature Generator</span>
        </nav>

        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 border border-turtle text-turtle rounded-full text-sm font-medium mb-6">Free Tool</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Email Signature Generator</h1>
          <p className="text-cloudy text-lg max-w-2xl mx-auto">Build professional HTML email signatures with live preview. Works in Gmail, Outlook, Apple Mail, and more.</p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={fillTestData}
            className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss"
          >
            Fill Test Data
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-6">
            <SignatureForm data={data} onUpdate={update} />
            <SocialLinksForm socials={data.socials} onUpdateSocial={updateSocial} />
            <DesignControls
              template={template} setTemplate={setTemplate}
              color={color} setColor={setColor}
              font={font} setFont={setFont}
            />

            {/* CTA */}
            <div className="card-gradient border border-metal/20 rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4">CTA Banner <span className="text-galactic text-sm font-normal">(optional)</span></h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-galactic block mb-1">Button Text</label>
                  <input type="text" value={data.cta.text} onChange={(e) => updateCta('text', e.target.value)} placeholder="Schedule a Demo" className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:border-azure transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-galactic block mb-1">Button URL</label>
                  <input type="text" value={data.cta.url} onChange={(e) => updateCta('url', e.target.value)} placeholder="https://calendly.com/..." className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:border-azure transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Export */}
          <div className="space-y-6">
            <SignaturePreview html={html} font={font} />
          </div>
        </div>
      </div>

      <footer className="border-t border-metal/30 mt-16">
        <div className="max-w-[1600px] mx-auto px-4 py-6 text-center text-sm text-galactic">
          Free marketing tools by <a href="https://www.dreamhost.com" target="_blank" rel="noopener" className="text-azure hover:text-white transition-colors">DreamHost</a>
        </div>
      </footer>
    </div>
  )
}
