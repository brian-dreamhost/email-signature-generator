import { useState, useRef } from 'react'

const TEMPLATES = [
  { id: 'professional', name: 'Professional', desc: 'Clean horizontal layout with divider' },
  { id: 'modern', name: 'Modern', desc: 'Left accent bar, compact layout' },
  { id: 'minimal', name: 'Minimal', desc: 'Text only, elegant spacing' },
  { id: 'bold', name: 'Bold', desc: 'Large name with colored header' },
]

const FONTS = ['Arial', 'Helvetica', 'Georgia', 'Verdana', 'Tahoma']

const SOCIAL_PLATFORMS = [
  { key: 'linkedin', label: 'LinkedIn', prefix: 'https://linkedin.com/in/' },
  { key: 'twitter', label: 'X (Twitter)', prefix: 'https://x.com/' },
  { key: 'instagram', label: 'Instagram', prefix: 'https://instagram.com/' },
  { key: 'facebook', label: 'Facebook', prefix: 'https://facebook.com/' },
  { key: 'youtube', label: 'YouTube', prefix: 'https://youtube.com/' },
]

function generateSignatureHTML(data, template, color, font) {
  const { name, title, company, email, phone, website, photo, socials, cta } = data
  const socialLinks = Object.entries(socials)
    .filter(([, url]) => url.trim())
    .map(([key, url]) => {
      const labels = { linkedin: 'LinkedIn', twitter: 'X', instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube' }
      return `<a href="${url}" target="_blank" style="color:${color};text-decoration:none;font-size:12px;">${labels[key]}</a>`
    })
    .join(' <span style="color:#999;">|</span> ')

  const base = `font-family:${font},Helvetica,Arial,sans-serif;`

  if (template === 'professional') {
    return `<table cellpadding="0" cellspacing="0" border="0" style="${base}">
  <tr>
    <td style="padding:0;">
      ${photo ? `<table cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right:15px;vertical-align:top;"><img src="${photo}" width="80" height="80" style="border-radius:50%;display:block;" alt="${name}" /></td><td style="vertical-align:top;">` : '<table cellpadding="0" cellspacing="0" border="0"><tr><td style="vertical-align:top;">'}
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:18px;font-weight:bold;color:#333333;padding-bottom:2px;">${name || 'Your Name'}</td></tr>
        ${title ? `<tr><td style="font-size:13px;color:#666666;padding-bottom:2px;">${title}</td></tr>` : ''}
        ${company ? `<tr><td style="font-size:13px;color:${color};font-weight:600;padding-bottom:8px;">${company}</td></tr>` : ''}
      </table>
      <table cellpadding="0" cellspacing="0" border="0" style="border-top:2px solid ${color};padding-top:8px;">
        ${email ? `<tr><td style="font-size:12px;color:#666666;padding-top:8px;">Email: <a href="mailto:${email}" style="color:${color};text-decoration:none;">${email}</a></td></tr>` : ''}
        ${phone ? `<tr><td style="font-size:12px;color:#666666;padding-top:2px;">Phone: <a href="tel:${phone}" style="color:${color};text-decoration:none;">${phone}</a></td></tr>` : ''}
        ${website ? `<tr><td style="font-size:12px;color:#666666;padding-top:2px;">Web: <a href="${website.startsWith('http') ? website : 'https://' + website}" style="color:${color};text-decoration:none;">${website.replace(/^https?:\/\//, '')}</a></td></tr>` : ''}
        ${socialLinks ? `<tr><td style="padding-top:8px;">${socialLinks}</td></tr>` : ''}
      </table>
      ${cta.text && cta.url ? `<table cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;"><tr><td style="background-color:${color};border-radius:4px;padding:8px 16px;"><a href="${cta.url}" target="_blank" style="color:#ffffff;text-decoration:none;font-size:12px;font-weight:600;">${cta.text}</a></td></tr></table>` : ''}
      </td></tr></table>
    </td>
  </tr>
</table>`
  }

  if (template === 'modern') {
    return `<table cellpadding="0" cellspacing="0" border="0" style="${base}">
  <tr>
    ${photo ? `<td style="vertical-align:top;padding-right:15px;"><img src="${photo}" width="70" height="70" style="border-radius:8px;display:block;" alt="${name}" /></td>` : ''}
    <td style="border-left:3px solid ${color};padding-left:12px;vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:17px;font-weight:bold;color:#333333;">${name || 'Your Name'}</td></tr>
        ${title || company ? `<tr><td style="font-size:12px;color:#666666;padding-top:2px;">${[title, company].filter(Boolean).join(' — ')}</td></tr>` : ''}
        <tr><td style="padding-top:6px;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${email ? `<td style="font-size:11px;padding-right:12px;"><a href="mailto:${email}" style="color:${color};text-decoration:none;">${email}</a></td>` : ''}
              ${phone ? `<td style="font-size:11px;padding-right:12px;"><a href="tel:${phone}" style="color:${color};text-decoration:none;">${phone}</a></td>` : ''}
              ${website ? `<td style="font-size:11px;"><a href="${website.startsWith('http') ? website : 'https://' + website}" style="color:${color};text-decoration:none;">${website.replace(/^https?:\/\//, '')}</a></td>` : ''}
            </tr>
          </table>
        </td></tr>
        ${socialLinks ? `<tr><td style="padding-top:6px;">${socialLinks}</td></tr>` : ''}
        ${cta.text && cta.url ? `<tr><td style="padding-top:10px;"><a href="${cta.url}" target="_blank" style="background-color:${color};color:#ffffff;text-decoration:none;font-size:11px;font-weight:600;padding:6px 14px;border-radius:4px;display:inline-block;">${cta.text}</a></td></tr>` : ''}
      </table>
    </td>
  </tr>
</table>`
  }

  if (template === 'minimal') {
    return `<table cellpadding="0" cellspacing="0" border="0" style="${base}">
  <tr><td style="font-size:16px;font-weight:bold;color:#333333;">${name || 'Your Name'}</td></tr>
  ${title || company ? `<tr><td style="font-size:13px;color:#888888;padding-top:2px;">${[title, company].filter(Boolean).join(', ')}</td></tr>` : ''}
  <tr><td style="padding-top:6px;font-size:12px;color:#888888;">${[email ? `<a href="mailto:${email}" style="color:${color};text-decoration:none;">${email}</a>` : '', phone ? `<a href="tel:${phone}" style="color:${color};text-decoration:none;">${phone}</a>` : '', website ? `<a href="${website.startsWith('http') ? website : 'https://' + website}" style="color:${color};text-decoration:none;">${website.replace(/^https?:\/\//, '')}</a>` : ''].filter(Boolean).join(' &middot; ')}</td></tr>
  ${socialLinks ? `<tr><td style="padding-top:4px;">${socialLinks}</td></tr>` : ''}
  ${cta.text && cta.url ? `<tr><td style="padding-top:8px;"><a href="${cta.url}" target="_blank" style="color:${color};text-decoration:none;font-size:12px;font-weight:600;">${cta.text} &rarr;</a></td></tr>` : ''}
</table>`
  }

  // bold template
  return `<table cellpadding="0" cellspacing="0" border="0" style="${base}width:100%;max-width:400px;">
  <tr><td style="background-color:${color};padding:14px 18px;border-radius:6px 6px 0 0;">
    <table cellpadding="0" cellspacing="0" border="0"><tr>
      ${photo ? `<td style="padding-right:14px;vertical-align:middle;"><img src="${photo}" width="60" height="60" style="border-radius:50%;border:2px solid rgba(255,255,255,0.3);display:block;" alt="${name}" /></td>` : ''}
      <td style="vertical-align:middle;">
        <span style="font-size:20px;font-weight:bold;color:#ffffff;display:block;">${name || 'Your Name'}</span>
        ${title ? `<span style="font-size:12px;color:rgba(255,255,255,0.8);display:block;padding-top:2px;">${title}</span>` : ''}
        ${company ? `<span style="font-size:12px;color:rgba(255,255,255,0.8);display:block;">${company}</span>` : ''}
      </td>
    </tr></table>
  </td></tr>
  <tr><td style="padding:12px 18px;border:1px solid #eee;border-top:none;border-radius:0 0 6px 6px;">
    <table cellpadding="0" cellspacing="0" border="0">
      ${email ? `<tr><td style="font-size:12px;color:#666;padding-bottom:3px;">Email: <a href="mailto:${email}" style="color:${color};text-decoration:none;">${email}</a></td></tr>` : ''}
      ${phone ? `<tr><td style="font-size:12px;color:#666;padding-bottom:3px;">Phone: <a href="tel:${phone}" style="color:${color};text-decoration:none;">${phone}</a></td></tr>` : ''}
      ${website ? `<tr><td style="font-size:12px;color:#666;padding-bottom:3px;">Web: <a href="${website.startsWith('http') ? website : 'https://' + website}" style="color:${color};text-decoration:none;">${website.replace(/^https?:\/\//, '')}</a></td></tr>` : ''}
      ${socialLinks ? `<tr><td style="padding-top:6px;">${socialLinks}</td></tr>` : ''}
      ${cta.text && cta.url ? `<tr><td style="padding-top:10px;"><a href="${cta.url}" target="_blank" style="background-color:${color};color:#ffffff;text-decoration:none;font-size:12px;font-weight:600;padding:8px 16px;border-radius:4px;display:inline-block;">${cta.text}</a></td></tr>` : ''}
    </table>
  </td></tr>
</table>`
}

export default function App() {
  const [data, setData] = useState({
    name: '', title: '', company: '', email: '', phone: '', website: '', photo: '',
    socials: { linkedin: '', twitter: '', instagram: '', facebook: '', youtube: '' },
    cta: { text: '', url: '' },
  })
  const [template, setTemplate] = useState('professional')
  const [color, setColor] = useState('#0073EC')
  const [font, setFont] = useState('Arial')
  const [copied, setCopied] = useState('')
  const [showCode, setShowCode] = useState(false)
  const previewRef = useRef(null)

  const update = (field, value) => setData(prev => ({ ...prev, [field]: value }))
  const updateSocial = (key, value) => setData(prev => ({ ...prev, socials: { ...prev.socials, [key]: value } }))
  const updateCta = (field, value) => setData(prev => ({ ...prev, cta: { ...prev.cta, [field]: value } }))

  const html = generateSignatureHTML(data, template, color, font)

  const copyHTML = async () => {
    await navigator.clipboard.writeText(html)
    setCopied('html')
    setTimeout(() => setCopied(''), 2000)
  }

  const copyRichText = async () => {
    try {
      const blob = new Blob([html], { type: 'text/html' })
      await navigator.clipboard.write([new ClipboardItem({ 'text/html': blob })])
      setCopied('rich')
      setTimeout(() => setCopied(''), 2000)
    } catch {
      await navigator.clipboard.writeText(html)
      setCopied('html')
      setTimeout(() => setCopied(''), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-abyss bg-glow bg-grid">
      <div className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn">
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="card-gradient border border-metal/20 rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4">Personal Info</h2>
              <div className="space-y-3">
                {[
                  ['name', 'Full Name', 'Jane Smith'],
                  ['title', 'Job Title', 'Marketing Manager'],
                  ['company', 'Company', 'Acme Corp'],
                  ['email', 'Email', 'jane@acme.com'],
                  ['phone', 'Phone', '+1 (555) 123-4567'],
                  ['website', 'Website', 'www.acme.com'],
                  ['photo', 'Photo / Logo URL', 'https://...'],
                ].map(([field, label, placeholder]) => (
                  <div key={field}>
                    <label className="text-xs text-galactic block mb-1">{label}</label>
                    <input type="text" value={data[field]} onChange={(e) => update(field, e.target.value)} placeholder={placeholder} className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:border-azure transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="card-gradient border border-metal/20 rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4">Social Links</h2>
              <div className="space-y-3">
                {SOCIAL_PLATFORMS.map(({ key, label, prefix }) => (
                  <div key={key}>
                    <label className="text-xs text-galactic block mb-1">{label}</label>
                    <input type="text" value={data.socials[key]} onChange={(e) => updateSocial(key, e.target.value)} placeholder={prefix} className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:border-azure transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Design */}
            <div className="card-gradient border border-metal/20 rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4">Design</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-galactic block mb-2">Template</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TEMPLATES.map(t => (
                      <button key={t.id} onClick={() => setTemplate(t.id)} className={`text-left p-3 rounded-lg border text-sm transition-colors ${template === t.id ? 'border-azure bg-azure/10 text-white' : 'border-metal/30 text-galactic hover:border-metal/50'}`}>
                        <div className="font-medium">{t.name}</div>
                        <div className="text-xs opacity-70">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-galactic block mb-1">Primary Color</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded border border-metal/30 cursor-pointer bg-transparent" />
                      <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 bg-midnight border border-metal/30 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-azure transition-colors" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-galactic block mb-1">Font</label>
                    <select value={font} onChange={(e) => setFont(e.target.value)} className="w-full bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-azure transition-colors">
                      {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

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
            <div className="card-gradient border border-metal/20 rounded-2xl p-5 sticky top-6">
              <h2 className="text-lg font-semibold text-white mb-4">Live Preview</h2>
              <div className="bg-white rounded-lg p-6 text-sm text-gray-600" style={{ fontFamily: font }}>
                <p className="mb-4" style={{ color: '#999', fontSize: '13px' }}>Thanks for your email. I'll get back to you shortly.</p>
                <p className="mb-4" style={{ color: '#999', fontSize: '13px' }}>Best regards,</p>
                <div ref={previewRef} dangerouslySetInnerHTML={{ __html: html }} />
              </div>

              <div className="flex gap-3 mt-4">
                <button onClick={copyHTML} className="flex-1 bg-azure text-white rounded-lg py-2.5 px-4 text-sm font-medium hover:bg-azure-hover transition-colors focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss">
                  {copied === 'html' ? '✓ Copied HTML!' : 'Copy HTML'}
                </button>
                <button onClick={copyRichText} className="flex-1 border border-azure text-azure rounded-lg py-2.5 px-4 text-sm font-medium hover:bg-azure/10 transition-colors focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss">
                  {copied === 'rich' ? '✓ Copied!' : 'Copy as Rich Text'}
                </button>
              </div>

              <button onClick={() => setShowCode(!showCode)} className="w-full mt-3 text-sm text-galactic hover:text-white transition-colors text-left flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
                {showCode ? 'Hide' : 'View'} HTML Code
              </button>

              {showCode && (
                <pre className="mt-3 bg-midnight border border-metal/20 rounded-lg p-4 text-xs text-cloudy overflow-x-auto max-h-80 overflow-y-auto font-mono whitespace-pre-wrap break-all">{html}</pre>
              )}

              <div className="mt-4 p-3 rounded-lg bg-midnight/50 border border-metal/10">
                <p className="text-xs text-galactic">
                  <strong className="text-cloudy">How to use:</strong> Click "Copy HTML" and paste into your email client's signature settings. For Gmail: Settings → Signature → paste. For Outlook: File → Options → Mail → Signatures → paste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-metal/30 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-galactic">
          Free marketing tools by <a href="https://www.dreamhost.com" target="_blank" rel="noopener" className="text-azure hover:text-white transition-colors">DreamHost</a>
        </div>
      </footer>
    </div>
  )
}
