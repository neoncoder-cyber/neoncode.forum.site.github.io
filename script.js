class Forum {
    constructor() {
        this.topics = this.loadTopics();
        this.currentTopicId = null;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderTopics();
        this.setupNeonAIFloat();
    }

    bindEvents() {
        document.getElementById('homeBtn').addEventListener('click', () => this.showHome());
        document.getElementById('newTopicBtn').addEventListener('click', () => this.showNewTopicForm());
        document.getElementById('submitTopic').addEventListener('click', () => this.createTopic());
        document.getElementById('cancelTopic').addEventListener('click', () => this.showHome());
        document.getElementById('backBtn').addEventListener('click', () => this.showHome());
        document.getElementById('submitReply').addEventListener('click', () => this.addReply());
        document.getElementById('loginBtn').addEventListener('click', () => this.signInWithGoogle());
        document.getElementById('logoutBtn').addEventListener('click', () => this.signOut());
        document.getElementById('categoryFilter').addEventListener('change', () => this.renderTopics());
        document.getElementById('aiChatBtn').addEventListener('click', () => this.showAIChat());
        document.getElementById('aiSendBtn').addEventListener('click', () => this.sendAIMessage());
        document.getElementById('aiMessageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendAIMessage();
        });
        document.getElementById('backBtnFromChat').addEventListener('click', () => this.showHome());
    }

    loadTopics() {
        const saved = localStorage.getItem('forumTopics');
        return saved ? JSON.parse(saved) : this.getDefaultTopics();
    }

    saveTopics() {
        localStorage.setItem('forumTopics', JSON.stringify(this.topics));
    }

    getDefaultTopics() {
        return [
            {
                id: 1,
                title: "Foruma Hoş Geldiniz",
                author: "Admin",
                date: new Date().toISOString(),
                message: "Bu yeni forum sitesine hoş geldiniz! Yeni konular oluşturabilir ve tartışmalara katılabilirsiniz.",
                replies: []
            },
            {
                id: 2,
                title: "JavaScript Öğrenmek İstiyorum",
                author: "YeniKullanici",
                date: new Date(Date.now() - 86400000).toISOString(),
                message: "Merhaba, JavaScript öğrenmek istiyorum ama nereden başlayacağımı bilmiyorum. Tavsiyeleriniz var mı?",
                replies: [
                    {
                        author: "Deneyimli",
                        date: new Date(Date.now() - 82800000).toISOString(),
                        text: "ÜcretsCodeCamp ve MDN dökümantasyonuyla başlayabilirsin. Çok pratik yapman gerek."
                    }
                ]
            },
            {
                id: 3,
                title: "Python mı Java mı?",
                author: "Kararsız",
                date: new Date(Date.now() - 172800000).toISOString(),
                message: "Yazılıma yeni başlayacağım ama hangi dille başlamalıyım? Python mu yoksa Java mı daha iyi?",
                replies: []
            },
            {
                id: 4,
                title: "React vs Vue Karşılaştırması",
                author: "Frontendci",
                date: new Date(Date.now() - 259200000).toISOString(),
                message: "Yeni bir proje başlatacağım. React mi Vue mu kullanmalıyım? Artıları ve eksileri nedir?",
                replies: [
                    {
                        author: "ReactFan",
                        date: new Date(Date.now() - 244800000).toISOString(),
                        text: "React büyük ekosistem ve topluluk desteği var. Vue daha kolay öğreniliyor ama React daha fazla iş imkanı sunuyor."
                    },
                    {
                        author: "VueSeveni",
                        date: new Date(Date.now() - 230400000).toISOString(),
                        text: "Ben Vue'yu tercih ediyorum. Daha temiz ve anlaşılır bir yapısı var. Dokümantasyonu da harika!"
                    }
                ]
            },
            {
                id: 5,
                title: "Yapay Zeka ve Gelecek",
                author: "AIFan",
                date: new Date(Date.now() - 345600000).toISOString(),
                message: "ChatGPT ve benzeri yapay zeka araçları yazılımcıların işini eliminden mi alacak? Ne düşünüyorsunuz?",
                replies: [
                    {
                        author: "Uzman",
                        date: new Date(Date.now() - 331200000).toISOString(),
                        text: "Yapay zeka araçları geliştiricilerin verimliliğini artırıyor. Tamamen yerini alması mümkün değil ama kullanmayan geride kalır."
                    }
                ]
            },
            {
                id: 6,
                title: "En İyi Kod Editörü Hangisi?",
                author: "EditörArkadaş",
                date: new Date(Date.now() - 432000000).toISOString(),
                message: "VS Code, Sublime Text, Atom... Hangi kod editörünü kullanıyorsunuz? Tavsiyeniz nedir?",
                replies: []
            },
            {
                id: 7,
                title: "Git ve GitHub Temelleri",
                author: "VersionControl",
                date: new Date(Date.now() - 518400000).toISOString(),
                message: "Git öğrenmek istiyorum. Hangi kaynakları önerirsiniz? Temel komutlar nelerdir?",
                replies: [
                    {
                        author: "GitMaster",
                        date: new Date(Date.now() - 504000000).toISOString(),
                        text: "Proje Git ile öğrenilir. Küçük bir proje oluştur ve commit, push, pull, branch gibi temel komutları uygulamalı öğren."
                    }
                ]
            },
            {
                id: 8,
                title: "Web Güvenliği İpuçları",
                author: "GuvenlikUzmanı",
                date: new Date(Date.now() - 604800000).toISOString(),
                message: "Web uygulamalarında güvenlik açıkları nasıl önlenir? SQL injection ve XSS nedir?",
                replies: []
            },
            {
                id: 9,
                title: "CSS Framework Seçimi",
                author: "StilSahibi",
                date: new Date(Date.now() - 691200000).toISOString(),
                message: "Bootstrap, Tailwind, Bulma... Hangi CSS framework'ünü kullanmalıyım? Hepsinin avantajları nedir?",
                replies: [
                    {
                        author: "TailwindFan",
                        date: new Date(Date.now() - 676800000).toISOString(),
                        text: "Tailwind utility-first yaklaşımı ile çok esnek. Özelleştirme konusunda çok güçlü."
                    }
                ]
            },
            {
                id: 10,
                title: "Backend mi Frontend mi?",
                author: "YönBulan",
                date: new Date(Date.now() - 777600000).toISOString(),
                message: "Kariyer olarak backend mi frontend mi seçmeliyim? Hangisi daha iyi para kazandırıyor?",
                replies: []
            },
            {
                id: 11,
                title: "Docker Öğrenme Rehberi",
                author: "Containerci",
                date: new Date(Date.now() - 864000000).toISOString(),
                message: "Docker öğrenmek istiyorum. Container nedir? Nereden başlamalıyım?",
                replies: []
            },
            {
                id: 12,
                title: "API Tasarımı En İyi Uygulamaları",
                author: "APIUzmanı",
                date: new Date(Date.now() - 950400000).toISOString(),
                message: "RESTful API tasarlarken nelere dikkat etmeliyim? En iyi uygulamalar nelerdir?",
                replies: [
                    {
                        author: "RESTFan",
                        date: new Date(Date.now() - 936000000).toISOString(),
                        text: "HTTP status kodlarını doğru kullan, versioning yap, dokümantasyon yazmayı unutma!"
                    }
                ]
            },
            {
                id: 13,
                title: "Mobil Uygulama Geliştirme",
                author: "Mobilci",
                date: new Date(Date.now() - 1036800000).toISOString(),
                message: "Flutter mı React Native mi? Yoksa native mi geliştirmeliyim? Kararsızım.",
                replies: []
            },
            {
                id: 14,
                title: "Kod Okuma ve Anlama",
                author: "KodAnalizci",
                date: new Date(Date.now() - 1123200000).toISOString(),
                message: "Başkasının yazdığı kodu nasıl daha iyi anlarım? Kod okuma becerilerimi nasıl geliştirebilirim?",
                replies: []
            },
            {
                id: 15,
                title: "Veritabanı Seçimi",
                author: "VeriUzmanı",
                date: new Date(Date.now() - 1209600000).toISOString(),
                message: "PostgreSQL, MySQL, MongoDB... Hangi veritabanını kullanmalıyım? Projeme nasıl karar vereceğim?",
                replies: []
            }
        ];
    }

    showHome() {
        document.getElementById('forumList').style.display = 'block';
        document.getElementById('topicView').style.display = 'none';
        document.getElementById('newTopicForm').style.display = 'none';
        document.getElementById('aiChat').style.display = 'none';
        this.renderTopics();
    }

    showNewTopicForm() {
        document.getElementById('forumList').style.display = 'none';
        document.getElementById('topicView').style.display = 'none';
        document.getElementById('newTopicForm').style.display = 'block';
        document.getElementById('topicTitle').value = '';
        document.getElementById('topicMessage').value = '';
    }

    createTopic() {
        const title = document.getElementById('topicTitle').value.trim();
        const message = document.getElementById('topicMessage').value.trim();

        if (!title || !message) {
            alert('Lütfen başlık ve mesaj alanlarını doldurun.');
            return;
        }
        if (!this.currentUser) {
            alert('Konu açmak için giriş yapmalısınız.');
            return;
        }

        const newTopic = {
            id: Date.now(),
            title: title,
            author: this.currentUser.displayName,
            date: new Date().toISOString(),
            message: message,
            replies: []
        };

        this.topics.unshift(newTopic);
        this.saveTopics();
        this.showHome();
    }

    renderTopics() {
        const container = document.getElementById('topicsList');
        container.innerHTML = '';

        this.topics.forEach(topic => {
            const topicEl = document.createElement('div');
            topicEl.className = 'topic-item';
            const isOwner = this.currentUser && topic.author === this.currentUser.displayName;
            topicEl.innerHTML = `
                <h3>${topic.title}</h3>
                <div class="topic-meta">
                    Yazan: ${topic.author} | Tarih: ${new Date(topic.date).toLocaleDateString('tr-TR')} | Yanıt: ${topic.replies.length}
                    ${isOwner ? `<button class="deleteBtn" data-id="${topic.id}" style="float:right;background:#e74c3c;">Sil</button>` : ''}
                </div>
            `;
            topicEl.addEventListener('click', (e) => {
                if (e.target.classList.contains('deleteBtn')) {
                    e.stopPropagation();
                    this.deleteTopic(parseInt(e.target.dataset.id));
                } else {
                    this.showTopic(topic.id);
                }
            });
            container.appendChild(topicEl);
        });
    }

    showTopic(topicId) {
        this.currentTopicId = topicId;
        const topic = this.topics.find(t => t.id === topicId);

        if (!topic) return;

        document.getElementById('forumList').style.display = 'none';
        document.getElementById('topicView').style.display = 'block';
        document.getElementById('newTopicForm').style.display = 'none';

        const content = document.getElementById('topicContent');
        content.innerHTML = `
            <h2>${topic.title}</h2>
            <div class="reply-item">
                <div class="reply-author">${topic.author} - ${new Date(topic.date).toLocaleString('tr-TR')}</div>
                <div class="reply-text">${topic.message}</div>
            </div>
        `;

        this.renderReplies(topic.replies);
    }

    renderReplies(replies) {
        const container = document.getElementById('repliesList');
        container.innerHTML = '';

        replies.forEach(reply => {
            const replyEl = document.createElement('div');
            replyEl.className = 'reply-item';
            replyEl.innerHTML = `
                <div class="reply-author">${reply.author} - ${new Date(reply.date).toLocaleString('tr-TR')}</div>
                <div class="reply-text">${reply.text}</div>
            `;
            container.appendChild(replyEl);
        });
    }

    addReply() {
        const replyText = document.getElementById('replyText').value.trim();
        if (!replyText) {
            alert('Lütfen bir yanıt yazın.');
            return;
        }
        if (!this.currentUser) {
            alert('Yanıt yazmak için giriş yapmalısınız.');
            return;
        }

        const topic = this.topics.find(t => t.id === this.currentTopicId);
        if (!topic) return;

        const newReply = {
            author: this.currentUser.displayName,
            date: new Date().toISOString(),
            text: replyText
        };

        topic.replies.push(newReply);
        this.saveTopics();
        document.getElementById('replyText').value = '';
        this.showTopic(this.currentTopicId);
    }

    deleteTopic(topicId) {
        if (!confirm('Bu konuyu silmek istediğinize emin misiniz?')) return;
        this.topics = this.topics.filter(t => t.id !== topicId);
        this.saveTopics();
        this.showHome();
    }

    deleteAllTopics() {
        if (!confirm('Tüm konuları silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;
        this.topics = [];
        this.saveTopics();
        this.showHome();
    }

    signInWithGoogle() {
        // Simplified Google sign-in simulation
        const displayName = prompt('Google hesabı yerine kullanıcı adı girin:');
        if (displayName && displayName.trim()) {
            this.currentUser = { displayName: displayName.trim() };
            this.updateUI();
        }
    }

    signOut() {
        this.currentUser = null;
        this.updateUI();
        this.showHome();
    }

    updateUI() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userInfo = document.getElementById('userInfo');
        if (this.currentUser) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            userInfo.style.display = 'block';
            userInfo.textContent = `Hoş geldin, ${this.currentUser.displayName}`;
        } else {
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            userInfo.style.display = 'none';
        }
    }

    setupNeonAIFloat() {
        const floatBtn = document.getElementById('neonAIFloat');
        floatBtn.addEventListener('click', () => this.showAIChat());
        
        // Rastgele mesajlar göster
        const messages = [
            "Merhaba! NeonAI'yım, yardımcı olmamı ister misin?",
            "Sorularınız mı var? NeonAI olarak buradayım!",
            "Kod yazmak mı istiyorsunuz? Size yardımcı olabilirim!",
            "Merhaba! Bugün nasıl yardımcı olabilirim?",
            "Yeni konular mı arıyorsunuz? Önerilerde bulunayım mı?"
        ];
        
        const bubble = document.querySelector('.neon-ai-bubble');
        let messageIndex = 0;
        
        setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            bubble.textContent = messages[messageIndex];
        }, 5000);
    }

    showAIChat() {
        document.getElementById('forumList').style.display = 'none';
        document.getElementById('topicView').style.display = 'none';
        document.getElementById('newTopicForm').style.display = 'none';
        document.getElementById('aiChat').style.display = 'block';
        
        // Clear previous chat history on first load
        const chatHistory = document.getElementById('aiChatHistory');
        if (chatHistory.children.length === 0) {
            const welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'chat-message ai-message';
            welcomeMessage.innerHTML = '<strong>NeonAI:</strong> Merhaba! Ben NeonAI, NeonCode forumunun yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?';
            chatHistory.appendChild(welcomeMessage);
        }
    }

    async sendAIMessage() {
        const input = document.getElementById('aiMessageInput');
        const message = input.value.trim();
        if (!message) return;

        const chatHistory = document.getElementById('aiChatHistory');
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user-message';
        userMessage.innerHTML = `<strong>${this.currentUser?.displayName || 'Sen'}:</strong> ${message}`;
        chatHistory.appendChild(userMessage);

        input.value = '';
        input.disabled = true;
        document.getElementById('aiSendBtn').disabled = true;

        const thinking = document.createElement('div');
        thinking.className = 'chat-message ai-message';
        thinking.innerHTML = '<strong>AI:</strong> Düşünüyorum...';
        chatHistory.appendChild(thinking);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        try {
            const completion = await websim.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "Sen NeonAI'sın, NeonCode forumunun yapay zeka asistanısın. Programlama, teknoloji, yazılım geliştirme konularında uzmanlaşmışsın. Türkçe konuşuyorsun. Kısa, öz ve anlaşılır cevaplar ver. Kod örnekleri kullan. Kullanıcıya yardımcı ve destekleyici ol. Forum sitesinin özelliklerini biliyorsun: kullanıcılar konu açabilir, yanıt yazabilir, Google ile giriş yapabilir. Forumda JavaScript, Python, React, Vue, yapay zeka, web güvenliği gibi konular var."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
            });

            thinking.innerHTML = `<strong>NeonAI:</strong> ${completion.content}`;
        } catch (error) {
            thinking.innerHTML = '<strong>NeonAI:</strong> Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.';
        }

        input.disabled = false;
        document.getElementById('aiSendBtn').disabled = false;
        input.focus();
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

// Uygulamayı başlat
new Forum();