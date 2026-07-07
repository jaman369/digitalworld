## Fix Mobile Menu v2 - Complete rewrite for all HTML files
## Updates: CSS with !important, new HTML with blue dot + all sub-links, new JS accordion

$dir = "d:\ZAMAN\Ai Folder\Kj Digital World"
$files = Get-ChildItem -Path $dir -Filter "*.html" | Where-Object { 
    $_.Name -ne "index.html" -and 
    $_.Name -ne "temp.html" -and 
    $_.Name -ne "tmp.html" -and 
    $_.Name -ne "lovable_contact.html" 
}

# The new mobile drawer HTML (same for all pages)
$newDrawerHTML = @'
<div class="mobile-drawer" id="mobDrawer">
  <a href="/">Home</a>

  <div class="ms-section" data-default-open="true"><span class="ms-dot"></span>SEO<span class="ms-toggle-icon">+</span></div>
  <div class="ms-group">
    <a href="/services/seo">All SEO Services</a>
    <a href="/services/seo#svc-local">Local SEO</a>
    <a href="/services/seo#svc-ecom">Ecommerce SEO</a>
    <a href="/services/seo#svc-intl">International SEO</a>
    <a href="/services/seo#svc-yt">Youtube / Video SEO</a>
    <a href="/services/seo#svc-saas">SaaS SEO</a>
    <a href="/services/seo#svc-semantic">Semantic SEO</a>
    <a href="/services/seo#svc-ai">AI SEO</a>
  </div>

  <div class="ms-section"><span class="ms-dot"></span>PPC / Paid Ads<span class="ms-toggle-icon">+</span></div>
  <div class="ms-group">
    <a href="/services/ppc">All Paid Ads</a>
    <a href="/services/ppc#svc-search">Google Search Ads</a>
    <a href="/services/ppc#svc-shopping">Google Shopping Ads</a>
    <a href="/services/ppc#svc-pmax">Performance Max</a>
    <a href="/services/ppc#svc-youtube">YouTube Ads</a>
    <a href="/services/ppc#svc-remarketing">Remarketing</a>
    <a href="/services/ppc#svc-facebook">Facebook Ads</a>
    <a href="/services/ppc#svc-instagram">Instagram Ads</a>
    <a href="/services/ppc#svc-tiktok">TikTok / LinkedIn Ads</a>
  </div>

  <div class="ms-section"><span class="ms-dot"></span>Web Design &amp; Dev<span class="ms-toggle-icon">+</span></div>
  <div class="ms-group">
    <a href="/services/web">All Web Services</a>
    <a href="/services/web#svc-uiux">Website Design (UI/UX)</a>
    <a href="/services/web#svc-wordpress">WordPress Development</a>
    <a href="/services/web#svc-shopify">Shopify Development</a>
    <a href="/services/web#svc-landing">Landing Page Design</a>
    <a href="/services/web#svc-speed">Website Speed Optimization</a>
    <a href="/services/web#svc-maintenance">Website Maintenance</a>
    <a href="/services/web#svc-migration">Website Migration</a>
    <a href="/services/web#svc-cms">CMS Setup</a>
  </div>

  <div class="ms-section"><span class="ms-dot"></span>Content &amp; More<span class="ms-toggle-icon">+</span></div>
  <div class="ms-group">
    <a href="/services/content">All Content Services</a>
    <a href="/services/content#svc-blog">Blog Writing &amp; Management</a>
    <a href="/services/content#svc-email">Email Marketing</a>
    <a href="/services/content#svc-content">Content Marketing</a>
    <a href="/services/content#svc-cro">CRO Audit &amp; Testing</a>
    <a href="/services/content#svc-backlink">Backlink Building</a>
    <a href="/services/content#svc-pr">Digital PR &amp; HARO</a>
    <a href="/services/content#svc-social">Social Media Content</a>
    <a href="/services/content#svc-press">Press Releases &amp; PR</a>
  </div>

  <a href="/portfolio" style="margin-top:14px;">Portfolio</a>
  <a href="/about">About</a>
  <a href="/blog">Blog</a>
  <a href="/contact" aria-label="Contact Us">Contact</a>
  <a href="/contact" class="mobile-cta">Get Started</a>
</div>
'@

# New CSS for mobile collapsible
$newCollapsibleCSS = @'
/* === MOBILE COLLAPSIBLE MENU === */
.mobile-drawer .ms-section{
  cursor:pointer!important;
  display:flex!important;
  align-items:center!important;
  gap:10px!important;
  user-select:none!important;
  padding:16px 4px!important;
  border-bottom:.5px solid rgba(255,255,255,.06)!important;
  font-size:14px!important;
  font-weight:600!important;
  letter-spacing:0!important;
  text-transform:none!important;
  color:rgba(255,255,255,.9)!important;
}
.mobile-drawer .ms-section .ms-dot{
  width:8px;height:8px;border-radius:50%;
  background:#0071e3;
  box-shadow:0 0 8px rgba(0,113,227,.5);
  flex-shrink:0;
}
.mobile-drawer .ms-section .ms-toggle-icon{
  margin-left:auto;
  font-size:18px;
  color:#0071e3;
  font-weight:300;
  transition:transform .3s ease;
  line-height:1;
}
.mobile-drawer .ms-section.open .ms-toggle-icon{
  transform:rotate(45deg);
}
.mobile-drawer .ms-section::after{content:none!important;}
.mobile-drawer .ms-group{
  max-height:0!important;
  overflow:hidden!important;
  transition:max-height .4s cubic-bezier(.4,0,.2,1)!important;
}
.mobile-drawer .ms-group.open{
  max-height:800px!important;
}
.mobile-drawer .ms-group a{
  display:block!important;
  padding:11px 4px 11px 22px!important;
  font-size:15px!important;
  color:rgba(255,255,255,.6)!important;
  border-bottom:none!important;
  text-decoration:none!important;
  transition:color .15s!important;
}
.mobile-drawer .ms-group a:hover,
.mobile-drawer .ms-group a:active{
  color:#fff!important;
}
/* === END MOBILE COLLAPSIBLE === */
'@

# New accordion JS
$newAccordionJS = @'
  // Accordion: collapsible service sections
  const sections = mobDrawer.querySelectorAll('.ms-section');

  function openSection(sec) {
    const group = sec.nextElementSibling;
    if (!group || !group.classList.contains('ms-group')) return;
    sec.classList.add('open');
    group.classList.add('open');
    const icon = sec.querySelector('.ms-toggle-icon');
    if (icon) icon.textContent = '\u2212';
  }

  function closeSection(sec) {
    const group = sec.nextElementSibling;
    if (!group || !group.classList.contains('ms-group')) return;
    sec.classList.remove('open');
    group.classList.remove('open');
    const icon = sec.querySelector('.ms-toggle-icon');
    if (icon) icon.textContent = '+';
  }

  sections.forEach(sec => {
    sec.addEventListener('click', () => {
      const isOpen = sec.classList.contains('open');
      sections.forEach(s => closeSection(s));
      if (!isOpen) openSection(sec);
    });
  });

  // Auto-open default section
  sections.forEach(sec => {
    if (sec.getAttribute('data-default-open') === 'true') {
      openSection(sec);
    }
  });
'@

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    if ($content -notmatch 'mobile-drawer') {
        Write-Host "SKIP (no mobile-drawer): $($file.Name)"
        continue
    }
    
    $changed = $false
    
    # ── 1. Replace mobile drawer HTML ──
    # Match from <div class="mobile-drawer" id="mobDrawer"> to its closing </div>
    # We need to find the drawer and replace its contents
    $drawerPattern = '(?s)<div class="mobile-drawer" id="mobDrawer">.*?</div>\s*(?=<(?:/nav|a href="/contact" class="mobile-cta"|/div>))'
    
    # Simpler approach: find the drawer start and its closing, replace everything
    $startMarker = '<div class="mobile-drawer" id="mobDrawer">'
    $startIdx = $content.IndexOf($startMarker)
    
    if ($startIdx -ge 0) {
        # Find the end of the mobile drawer - look for </div> followed by </nav>
        $searchFrom = $startIdx
        $endPattern = '</div>\s*\r?\n\s*</nav>'
        $endMatch = [regex]::Match($content.Substring($searchFrom), $endPattern)
        
        if ($endMatch.Success) {
            $endIdx = $searchFrom + $endMatch.Index + $endMatch.Length
            $beforeDrawer = $content.Substring(0, $startIdx)
            $afterDrawer = $content.Substring($endIdx)
            
            # Find just the </nav> part to preserve it
            $navClose = '</nav>'
            
            $content = $beforeDrawer + $newDrawerHTML + "`r`n" + $navClose + $afterDrawer
            $changed = $true
            Write-Host "  -> Replaced drawer HTML in $($file.Name)"
        } else {
            # Try alternate pattern: </div> on its own line before other content
            # For services pages, drawer might close differently
            # Look for closing pattern: mobile-cta link then </div> then </nav>
            $altPattern = '</div>\s*\r?\n\s*(?:</div>)?\s*\r?\n\s*</nav>'
            $altMatch = [regex]::Match($content.Substring($searchFrom), $altPattern)
            if ($altMatch.Success) {
                $endIdx = $searchFrom + $altMatch.Index + $altMatch.Length
                $beforeDrawer = $content.Substring(0, $startIdx)
                $afterDrawer = $content.Substring($endIdx)
                $content = $beforeDrawer + $newDrawerHTML + "`r`n</nav>" + $afterDrawer
                $changed = $true
                Write-Host "  -> Replaced drawer HTML (alt pattern) in $($file.Name)"
            } else {
                Write-Host "  !! Could not find drawer end in $($file.Name)"
            }
        }
    }
    
    # ── 2. Fix CSS: Replace old collapsible + drawer link styles ──
    # Remove old .mobile-drawer .ms-section and .ms-sub styles (non-collapsible ones)
    $content = $content -replace [regex]::Escape('.mobile-drawer .ms-section{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#0071e3;padding:18px 4px 6px;border:none;}'), ''
    $content = $content -replace [regex]::Escape('.mobile-drawer .ms-sub{padding-left:16px;font-size:14px;color:rgba(255,255,255,.65);}'), ''
    
    # Fix the generic .mobile-drawer a to use child combinator
    $content = $content -replace [regex]::Escape('.mobile-drawer a{display:block;padding:14px 4px;color:rgba(255,255,255,.85);font-size:16px;border-bottom:.5px solid rgba(255,255,255,.06);text-decoration:none;}'), '.mobile-drawer>a{display:block;padding:14px 4px;color:rgba(255,255,255,.85);font-size:16px;border-bottom:.5px solid rgba(255,255,255,.06);text-decoration:none;}'
    $content = $content -replace [regex]::Escape('.mobile-drawer a:hover{color:#fff;}'), '.mobile-drawer>a:hover{color:#fff;}'
    
    # Fix mobile-cta with !important
    $content = $content -replace [regex]::Escape('.mobile-drawer .mobile-cta{display:block;background:#0071e3;color:#fff;text-align:center;padding:14px;border-radius:980px;margin-top:24px;font-weight:500;border:none;}'), '.mobile-drawer .mobile-cta{display:block!important;background:#0071e3!important;color:#fff!important;text-align:center!important;padding:14px!important;border-radius:980px!important;margin-top:24px!important;font-weight:500!important;border:none!important;}'
    
    # Replace old collapsible CSS block
    $oldCollapsiblePatterns = @(
        '(?s)/\* === MOBILE COLLAPSIBLE === \*/.*?/\* === END === \*/',
        '(?s)/\* === MOBILE COLLAPSIBLE MENU === \*/.*?/\* === END MOBILE COLLAPSIBLE === \*/'
    )
    
    $replacedCSS = $false
    foreach ($pat in $oldCollapsiblePatterns) {
        if ($content -match $pat) {
            $content = [regex]::Replace($content, $pat, $newCollapsibleCSS)
            $replacedCSS = $true
            $changed = $true
            Write-Host "  -> Replaced collapsible CSS in $($file.Name)"
            break
        }
    }
    
    if (-not $replacedCSS) {
        # If no collapsible CSS block found, insert before RESPONSIVE LAYOUT OVERRIDES
        if ($content -match '/\* RESPONSIVE LAYOUT OVERRIDES START \*/') {
            $content = $content -replace '/\* RESPONSIVE LAYOUT OVERRIDES START \*/', "$newCollapsibleCSS`r`n`r`n/* RESPONSIVE LAYOUT OVERRIDES START */"
            $changed = $true
            Write-Host "  -> Inserted collapsible CSS in $($file.Name)"
        }
    }
    
    # ── 3. Fix JS: Add/replace accordion with new version ──
    # Remove old MOBILE COLLAPSIBLE WIRE JS block (services pages)
    $oldWirePattern = '(?s)/\* === MOBILE COLLAPSIBLE WIRE === \*/.*?}\)\(\);'
    if ($content -match $oldWirePattern) {
        $content = [regex]::Replace($content, $oldWirePattern, '')
        $changed = $true
    }
    
    # Check if accordion JS already exists with new format
    if ($content -match 'openSection|closeSection') {
        Write-Host "  -> JS already has new accordion in $($file.Name)"
    } else {
        # Find the mobile menu wire-up JS and add accordion after the link close handler
        # Pattern: after the drawerLinks/link close handler, before the closing of the if block
        
        # For pages with the IIFE pattern: (function() { var t = ... })();
        $iifePattern = "(?s)(var t = document\.getElementById\('mobToggle'\);\s*var d = document\.getElementById\('mobDrawer'\);\s*if \(t && d\) \{.*?d\.querySelectorAll\('a'\)\.forEach\(function\(a\) \{.*?document\.body\.style\.overflow = '';\s*\}\);\s*\}\);\s*\})"
        
        if ($content -match $iifePattern) {
            # Replace the entire IIFE mobile menu block with new version
            $newMobileJS = @"
var t = document.getElementById('mobToggle');
    var d = document.getElementById('mobDrawer');
    if (t && d) {
      t.addEventListener('click', function() {
        var open = !d.classList.contains('open');
        t.classList.toggle('open', open);
        d.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      d.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
          t.classList.remove('open');
          d.classList.remove('open');
          document.body.style.overflow = '';
        });
      });

      // Accordion
      var secs = d.querySelectorAll('.ms-section');
      function openSec(s) {
        var g = s.nextElementSibling;
        if (!g || !g.classList.contains('ms-group')) return;
        s.classList.add('open'); g.classList.add('open');
        var ic = s.querySelector('.ms-toggle-icon');
        if (ic) ic.textContent = '\u2212';
      }
      function closeSec(s) {
        var g = s.nextElementSibling;
        if (!g || !g.classList.contains('ms-group')) return;
        s.classList.remove('open'); g.classList.remove('open');
        var ic = s.querySelector('.ms-toggle-icon');
        if (ic) ic.textContent = '+';
      }
      secs.forEach(function(s) {
        s.addEventListener('click', function() {
          var wasOpen = s.classList.contains('open');
          secs.forEach(function(x) { closeSec(x); });
          if (!wasOpen) openSec(s);
        });
      });
      secs.forEach(function(s) {
        if (s.getAttribute('data-default-open') === 'true') openSec(s);
      });
    }
"@
            $content = [regex]::Replace($content, $iifePattern, $newMobileJS)
            $changed = $true
            Write-Host "  -> Replaced IIFE mobile JS in $($file.Name)"
        }
        
        # For pages with DOMContentLoaded pattern
        $domPattern = "(?s)(mobDrawer\.classList\.remove\('open'\);\s*document\.body\.style\.overflow = '';\s*\}\);\s*\}\);)\s*\r?\n(\s*// Collapsible sections.*?)\s*(\}\s*\r?\n\s*\}\);)"
        if ($content -match $domPattern) {
            $replacement = "`$1`r`n`r`n$newAccordionJS`r`n  `$3"
            $content = [regex]::Replace($content, $domPattern, $replacement)
            $changed = $true
            Write-Host "  -> Replaced DOMContentLoaded accordion JS in $($file.Name)"
        } elseif ($content -match "(?s)(mobDrawer\.classList\.remove\('open'\);\s*\}\);\s*\}\);)\s*\r?\n(\s*// Collapsible sections.*?)\s*(\}\s*\r?\n\s*\}\);)") {
            # Without body overflow line
            $content = [regex]::Replace($content, "(?s)(mobDrawer\.classList\.remove\('open'\);\s*\}\);\s*\}\);)\s*\r?\n(\s*// Collapsible sections.*?)\s*(\}\s*\r?\n\s*\}\);)", "`$1`r`n`r`n$newAccordionJS`r`n  `$3")
            $changed = $true
            Write-Host "  -> Replaced accordion JS (alt) in $($file.Name)"
        }
    }
    
    if ($changed) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "FIXED: $($file.Name)"
    } else {
        Write-Host "NO CHANGE: $($file.Name)"
    }
}

Write-Host "`nDone! All files processed."
